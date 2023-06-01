import React, {useState, useRef, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {W} from '../style/constant';
import {ScrollView} from 'react-native-gesture-handler';
import {useAnimatedScrollHandler} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
const DATA = [
  {id: 1, text: 'Item 1'},
  {id: 2, text: 'Item 2'},
  {id: 3, text: 'Item 3'},
  {id: 4, text: 'Item 4'},
  {id: 5, text: 'Item 5'},
];
/**
 * make 3 flatlist for the data to render
 * those flatlist would be inside scrollview.
 * paging enabled prop should be true
 * scroll to middle flatlist on initial render
 *
 * if user leaves middle flatlist and goes to first flatlist then
 * append one more flatlist at begging and remove last flatlist making user to stay in middle flatlist again
 *
 * well do same for the rightside.
 *
 *
 * addition and deletion of slides are fairly simple we will add and remove data from the data passed to flatlist
 *
 */
const flatlistWidth = W * DATA.length;
export const CircularTabView = () => {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const [initialRender, setInitialRender] = useState(true);
  const [dataForFlatlist, setDataForFlatlist] = useState([100, 101, 102]);
  useEffect(() => {
    const timer = setTimeout(() => {
      initialRender &&
        scrollRef &&
        scrollRef.current?.scrollTo({x: flatlistWidth, animated: false});
      setInitialRender(false);
    }, 0);
    // return ()=>timer.
  }, [scrollRef.current]);

  const handleScroll = useAnimatedScrollHandler(event => {
    const contentOffsetX = event.contentOffset.x;
    if (contentOffsetX >= 0 && contentOffsetX <= flatlistWidth) {
      // Scrolled to the left edge
      // we will add logic to append at start of flatlist here
      console.log('1rd');
      /*runOnJS(() => {
        const [x, y, z] = dataForFlatlist;
        const newDataForFlatlist = [z, x, y];
        setDataForFlatlist(newDataForFlatlist);
      });*/
    } else if (
      contentOffsetX > flatlistWidth &&
      contentOffsetX <= 2 * flatlistWidth
    ) {
      console.log('2rd');
    } else if (contentOffsetX > 2 * flatlistWidth) {
      console.log('3rd');
      // Scrolled to the right edge
      // we will add logic to append at end of flatlist here
    }
  });
  return (
    <Animated.ScrollView
      onScroll={handleScroll}
      ref={scrollRef}
      horizontal
      scrollEventThrottle={16}
      style={{paddingTop: 100}}>
      {dataForFlatlist.map(item => {
        return (
          <FlatList
            style={{
              backgroundColor:
                item == 100 ? 'red' : item == 101 ? 'green' : 'blue',
            }}
            horizontal
            data={DATA}
            renderItem={({item}) => <Text style={{width: W}}>{item.text}</Text>}
          />
        );
      })}
    </Animated.ScrollView>
  );
};
