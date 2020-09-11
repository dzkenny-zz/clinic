import React from 'react';
import { Right, Container, Header, Content, Body, Spinner, Text, View, Left, Button } from 'native-base';
import { useStores } from '../../stores';
import { ActionState } from '../../models/common';
import { clearRecord } from '../../actions/records';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';

const RecordPage = observer(() => {
    const stores = useStores();
    const navigation = useNavigation();

    const onBack = () => {
        clearRecord({ stores });
        navigation.goBack();
    }

    const isLoading = stores.recordStore.loadingState === ActionState.IN_PROGRESS;
    const record = stores.recordStore.record;

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={onBack}>
                        <Text>Back</Text>
                    </Button>
                </Left>
                <Body>
                    <Text>Record</Text>
                </Body>
                <Right>
                </Right>
            </Header>
            <Content>
                <View>
                    <Text>id: {record.id}</Text>
                    <Text>Doctor: {record.doctor}</Text>
                    <Text>Patient: {record.patient}</Text>
                    <Text>Diagonsis: {record.diagonsis}</Text>
                    <Text>Medication: {record.medication}</Text>
                    <Text>Fee: {record.fee}</Text>
                    <Text>Date: {record.dateTime ? moment(record.dateTime).format('L') : ''}</Text>
                    <Text>Time: {record.dateTime ? moment(record.dateTime).format('hh:ss') : ''}</Text>
                    <Text>Follow Up: {record.followUp ? 'Yes' : 'No'}</Text>
                </View>
                {
                    isLoading ? <Spinner /> : null
                }
            </Content>
        </Container>
    )
})

export default RecordPage;