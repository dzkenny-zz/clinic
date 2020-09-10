import React, { useState } from 'react';
import { Right, Container, Header, Content, Body, Spinner } from 'native-base';
import { ButtonGroup } from 'react-native-elements';
import Calendar from './calendar';
import { useStores } from '../../stores';
import { ActionState } from '../../models/common';
import RecordList from './list';
import DatePicker from './datePicker';

const MainPage = () => {
    const stores = useStores();
    const [index, setIndex] = useState(2);
    const onModeChange = (selectedIndex: number) => {
        setIndex(selectedIndex);
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