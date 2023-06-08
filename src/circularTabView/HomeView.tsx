import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {W, commonPadding} from '../style/constant';
const initialTabViewData = [
  {
    _id: '1',
    screenTitle: 'Screen 1',
  },
  {
    _id: '2',
    screenTitle: 'Screen 2',
  },
  {
    _id: '3',
    screenTitle: 'Screen 3',
  },
];

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={{color: 'white'}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const ScreenView = (props: ScreenViewProps) => {
  return (
    <View
      style={[
        styles.screenViewStyle,
        {
          backgroundColor: props.tabIndex % 2 == 0 ? 'blue' : 'grey',
        },
      ]}>
      <Text>{props.tabItem.screenTitle}</Text>
      {props.shouldRemove ? (
        <Button title="Remove" onPress={() => props.onRemove(props.tabIndex)} />
      ) : null}
    </View>
  );
};
export const HomeView = () => {
  //getting data ready
  const getFakeData = (item: TabItem): TabItem => {
    return {
      _id: Math.ceil(Math.random() * 1000).toString(),
      screenTitle: item.screenTitle,
    };
  };
  const startFakeData = getFakeData(
    initialTabViewData[initialTabViewData.length - 1],
  );
  const endFakeData = getFakeData(initialTabViewData[0]);
  const tabData = [startFakeData, ...initialTabViewData, endFakeData];

  //adding ref to scrollview for imperative scrolling,
  const tabScrollRef = useRef<ScrollView | null>(null);
  const [tabs, setTabs] = useState<TabItem[] | []>(tabData);

  useEffect(() => {
    //initial scroll to data start
    setTimeout(() => {
      tabScrollRef && tabScrollRef.current?.scrollTo({x: W, animated: false});
    }, 10);
  }, []);

  const scrollToTab = (tabIndex: number) => {
    tabScrollRef.current?.scrollTo({x: tabIndex * W, animated: true});
  };

  const addNewTab = () => {
    const newTabId = (Number(tabs[tabs.length - 2]._id) + 1).toString();
    const newTabItem: TabItem = {
      _id: newTabId,
      screenTitle: `Screen ${newTabId}`,
    };
    setTabs(tabs => {
      let newTabs: TabItem[] = [];
      for (let i = 0; i < tabs.length; i++) {
        newTabs.push(tabs[i]);
        if (i == tabs.length - 2) {
          newTabs.push(newTabItem);
        }
      }
      const changedStartFakeData = getFakeData(newTabs[newTabs.length - 2]);
      newTabs[0] = changedStartFakeData;
      //add tab to second last element.
      // change first element .
      return newTabs;
    });
  };

  const removeTab = (tabIndex: number) => {
    if (tabs.length < 4) {
      console.log('last data');
      return;
    }
    setTabs(tabs => {
      const newTabs = tabs.filter((tabItem, index) => tabIndex != index);
      if (tabIndex == tabs.length - 2) {
        //deleted last item -> move to first
        tabScrollRef && tabScrollRef.current?.scrollTo({x: W, animated: false});
        // change first element
        const changedStartFakeData = getFakeData(newTabs[newTabs.length - 2]);
        newTabs[0] = changedStartFakeData;
      }
      if (tabIndex == 1) {
        //delete first item ->automaticaly moves to 2 element
        // change last elemet
        const changedEndFakeData = getFakeData(newTabs[1]);
        newTabs[newTabs.length - 1] = changedEndFakeData;
      }
      return newTabs;
    });
  };

  const onTabPress = (index: number) => {
    scrollToTab(index);
  };
  return (
    <View style={styles.mainContainer}>
      {/* corresponding button on edges , for calling modals to open */}
      <View style={styles.topHeadingContainer}>
        <Button title="Add New Tab" onPress={addNewTab} />
        <View style={styles.topTabList}>
          {tabs.map((tabItem, tabIndex) => {
            if (tabIndex == 0 || tabIndex == tabs.length - 1) {
              return null;
            }
            return (
              <View
                key={tabItem._id.toString()}
                style={{marginTop: 5, marginLeft: 10}}>
                <Button
                  title={`Tab ${tabItem._id}`}
                  onPress={() => {
                    onTabPress(tabIndex);
                  }}
                />
                <View style={{width: 5}} />
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.bottomTabContainer}>
        <ScrollView
          scrollEnabled={tabs.length > 3}
          scrollEventThrottle={16}
          onScroll={ev => {
            //scroll to first item
            if (ev.nativeEvent.contentOffset.x == W * (tabs.length - 1)) {
              tabScrollRef &&
                tabScrollRef.current?.scrollTo({x: W, animated: false});
            }
            //scroll to last item
            if (ev.nativeEvent.contentOffset.x == 0) {
              tabScrollRef &&
                tabScrollRef.current?.scrollTo({
                  x: W * (tabs.length - 2),
                  animated: false,
                });
            }
          }}
          ref={tabScrollRef}
          pagingEnabled
          horizontal
          style={styles.horizontalContainer}>
          {tabs.map((tabItem, tabIndex) => {
            return (
              <ScreenView
                key={tabItem._id}
                tabItem={tabItem}
                tabIndex={tabIndex}
                shouldRemove={
                  tabIndex != 0 ||
                  tabIndex != tabs.length - 1 ||
                  tabs.length > 4
                }
                onRemove={removeTab}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {flex: 1, paddingTop: 56},
  topHeadingContainer: {
    backgroundColor: 'yellow',
    width: W,
    padding: commonPadding,
  },
  topTabList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    padding: 5,
  },
  bottomTabContainer: {flex: 1, backgroundColor: 'green', width: '100%'},
  horizontalContainer: {flex: 1, backgroundColor: 'pink'},
  screenViewStyle: {
    height: '100%',
    width: W,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#378b9f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
});

interface TabItem {
  _id: string;
  screenTitle: string;
}
interface ScreenViewProps {
  tabItem: TabItem;
  tabIndex: number;
  shouldRemove: boolean;
  onRemove: (tabIndex: number) => void;
}
interface ButtonProps {
  title: string;
  onPress: () => void;
}
