import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { H, ModalDirection, W, commonPadding } from '../style/constant';
import { Content, Modal } from '../components';
import { ScrollView } from 'react-native-gesture-handler';
const initialTabView = [
    {
        _id: '1',
        screenTitle: 'Screen 0'
    },

]
const Button = (props: { title: string; onPress: () => void }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: '#378b9f', justifyContent: 'center',
                alignItems: 'center', padding: 5, borderRadius: 5
            }}
            onPress={props.onPress} >
            <Text style={{ color: 'white' }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const ScreenView = (props: {
    tabItem: TabItem,
    tabIndex: number,
    onRemove: (tabIndex: number) => void
}) => {
    return (
        <View style={{
            height: "100%",
            width: W,
            justifyContent: "center", alignItems: 'center',
            backgroundColor: props.tabIndex % 2 == 0 ? 'blue' : 'grey'
        }}>
            <Text>{props.tabItem.screenTitle}</Text>
            <Button title='Remove' onPress={() => props.onRemove(props.tabIndex)} />
        </View>
    )
}
const getRenderingData = (tabData: any[], currentIndex: number) => {
    let prev = null;
    let next = null;
    let current = null;

    if (tabData.length == 1) {
        prev = tabData[0];
        next = tabData[0];
        current = tabData[0];
    }
    if (tabData.length >= 2) {
        current = tabData[currentIndex];
        prev = tabData[currentIndex - 1] ?? tabData[tabData.length - 1];
        next = tabData[currentIndex + 1] ?? tabData[0];
    }

    return [prev, current, next]
}
export const HomeView = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const [tabs, setTabs] = useState<TabItem[] | []>(initialTabView);
    const [currentIndex, setCurrentIndex] = useState(tabs.length - 1);
    const [tabsForRender, setTabsForRender] = useState(getRenderingData(tabs, currentIndex));
    const tabScrollRef = useRef<ScrollView | null>(null);
    const scrollToTab = (tabIndex: number) => {
        tabScrollRef.current?.scrollTo({ x: tabIndex * W, animated: true })
    }

    const handleScroll = (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.x;
        if (currentOffset > scrollPosition) {
            // User has scrolled to the right
            console.log('Scrolled to the right');
            if (tabs.length == 1) {
                setTabsForRender(getRenderingData(tabs, 0));
                setCurrentIndex(0);
            }
            if (tabs.length >= 2) {
                const newCurrentIndex = currentIndex - 1;
                setTabsForRender(getRenderingData(tabs, newCurrentIndex))
            }


        } else if (currentOffset < scrollPosition) {
            // User has scrolled to the left
            console.log('Scrolled to the left');
        }
        setScrollPosition(currentOffset);
    };


    const addNewTab = () => {
        const newTabId = (Number(tabs[tabs.length - 1]._id) + 1).toString()
        const newTabItem: TabItem = {
            _id: newTabId,
            screenTitle: `Screen ${newTabId}`
        };
        setTabs(tabs => {
            return [...tabs, newTabItem]
        })
    }
    const removeTab = (tabIndex: number) => {
        if (tabs.length == 1) {
            return;
        }
        setTabs(tabs => {
            const newTabs = tabs.filter((tabItem, index) => tabIndex != index);
            return newTabs;
        })
    }
    const onTabPress = (index: number) => {
        scrollToTab(index)
    }
    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            {/* corresponding button on edges , for calling modals to open */}
            <View style={{ backgroundColor: 'yellow', width: W, padding: commonPadding, }} >
                <Button
                    title='Add New Tab'
                    onPress={addNewTab}
                />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "100%", padding: 5 }}>
                    {
                        tabs.map(((tabItem, tabIndex) => {
                            return (<>
                                <Button title={`Tab ${tabItem._id}`} onPress={() => { onTabPress(tabIndex) }} />
                                <View style={{ width: 5 }} />
                            </>
                            )
                        }))
                    }
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: "green", width: '100%' }}>
                <ScrollView ref={tabScrollRef}
                    onScroll={handleScroll}
                    pagingEnabled horizontal style={{ flex: 1, backgroundColor: 'pink' }}>
                    {
                        tabsForRender.map((tabItem, tabIndex) => {
                            return <ScreenView tabItem={tabItem} tabIndex={tabIndex} onRemove={removeTab} />

                        })
                    }
                </ScrollView>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    roundButtonContainer: {
        backgroundColor: 'powderblue',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topCenter: {
        position: 'absolute',
        left: W / 2 - 20,
        top: commonPadding + 20,
    },
    bottomCenter: {
        position: 'absolute',
        left: W / 2 - 20,
        bottom: commonPadding,
    },
    leftCenter: {
        position: 'absolute',
        top: H / 2 - 20,
        left: commonPadding,
    },
    rightCenter: {
        position: 'absolute',
        top: H / 2 - 20,
        right: commonPadding,
    },
});



interface TabItem {
    _id: string;
    screenTitle: string;
}