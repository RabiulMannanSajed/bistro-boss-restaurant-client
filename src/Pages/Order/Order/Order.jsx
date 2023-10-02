import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useManu';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OrderItemTab from '../OrderItemTab/OrderItemTab';
const Order = () => {

    // this is take to match the tab and where to it's comming from 
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']

    // keep the track of it's previous path 
    const { category } = useParams()

    // which path of category is same to the categories value is match then initialIndex is that value 
    const initialIndex = categories.indexOf(category);
    console.log(initialIndex);
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu] = useMenu();
    // console.log(category);
    const dessert = menu.filter(item => item.category === 'dessert')
    console.log(dessert.item);
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')



    return (
        <div className=' justify-center items-center text-center'>
            <Helmet>
                <title>
                    Bistro Boss | Order Food
                </title>
            </Helmet>
            <Cover img={orderCover} title={"Order Food"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                {/* salad */}
                <TabPanel>
                    <OrderItemTab items={salad}></OrderItemTab>
                   
                </TabPanel>
                {/* Pizza */}
                <TabPanel>
                <OrderItemTab items={pizza}></OrderItemTab>
                                  
                </TabPanel>

                {/* Soup */}
                <TabPanel>
                <OrderItemTab items={soup}></OrderItemTab>
                
                </TabPanel>

                {/* Dessert */}
                <TabPanel>
                <OrderItemTab items={dessert}></OrderItemTab>

                </TabPanel>

                {/* Drinks */}
                <TabPanel>
                <OrderItemTab items={drinks}></OrderItemTab>

                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;