import React, { useState } from 'react';
import { Right, Container, Header, Content, Body, Spinner, Button, Text } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import Calendar from './calendar';
import { useStores } from '../../stores';
import { ActionState } from '../../models/common';
import RecordList from './list';
import DatePicker from './datePicker';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const MainPage = () => {
    const stores = useStores();
    const navigation = useNavigation();

    const [index, setIndex] = useState(2);
    const onModeChange = (selectedIndex: number) => {
        setIndex(selectedIndex);
    }

    const goCreate = () => {
        navigation.dispatch(DrawerActions.jumpTo('Create'));
    }

    const isLoading = stores.calendarStore.loadingState === ActionState.IN_PROGRESS;

    return (
        <Container>
            <Header>
                <Body>
                    <ButtonGroup
                        onPress={onModeChange}
                        selectedIndex={index}
                        buttons={['Day', 'Week', 'Month']}
                    />
                </Body>
                <Right>
                    <Button transparent onPress={goCreate}>
                        <Text>Add</Text>
                    </Button>
                </Right>
            </Header>
            <Content>

                {
                    index === 2 ?
                        <Calendar /> :
                        index === 1 ?
                            <Calendar /> :
                                <DatePicker />
                }
                <RecordList />
                { isLoading ? <Spinner /> : null }
            </Content>
        </Container>
    )
}

export default MainPage;