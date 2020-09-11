import React, { useEffect, useState } from 'react';
import { Right, Container, Header, Content, Body, Spinner, Text, View, Left, Button, Item, Label } from 'native-base';
import { useStores } from '../../stores';
import { ActionState } from '../../models/common';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../components/textInput';
import * as _ from 'lodash';
import NumberInput from '../../components/numberInput';
import CheckBox from '../../components/checkBox';
import DatePicker from '../../components/datePicker';
import { StyleSheet } from 'react-native';
import { createRecord } from '../../actions/records';
import { Record } from '../../models/record';

const RecordCreatePage = () => {
    const navigation = useNavigation();
    const stores = useStores();

    const [doctor, setDoctor] = useState('');
    const [patient, setPatient] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [diagonsis, setDiagonsis] = useState('');
    const [medication, setMedication] = useState('');
    const [fee, setFee] = useState(0);
    const [followUp, setFollowUp] = useState(false);
    const [errorObj, setErrorObj] = useState<any>({});

    const onDoctorChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'doctor'));
        setDoctor(value);
    }

    const onPatientChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'patient'));
        setPatient(value);
    }

    const onDateTimeChange = (value: Date) => {
        console.log(value);
        setErrorObj(_.omit(errorObj, 'dateTime'));
        setDateTime(value);
    }

    const onDiagonsisChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'diagonsis'));
        setDiagonsis(value);
    }

    const onMedicationChange = (value: string) => {
        setErrorObj(_.omit(errorObj, 'medication'));
        setMedication(value);
    }

    const onFeeChange = (value: number) => {
        setErrorObj(_.omit(errorObj, 'fee'));
        setFee(value);
    }

    const onFollowUpChange = (value: boolean) => {
        setErrorObj(_.omit(errorObj, 'followUp'));
        setFollowUp(value);
    }

    const onBack = () => {
        navigation.goBack();
        reset();
    }

    const reset = () => {
        setDoctor('');
        setPatient('');
        setDateTime(new Date());
        setDiagonsis('');
        setMedication('');
        setFee(0);
        setFollowUp(false);
        setErrorObj({});
    }

    const onCreate = () => {
        const record = new Record({
            doctor,
            patient,
            dateTime,
            diagonsis,
            medication,
            fee,
            followUp
        });

        createRecord({ record, stores, navigation })
            .then((errorObj) => {
                setErrorObj(errorObj);
            });
    }

    const isLoading = stores.recordStore.loadingState === ActionState.IN_PROGRESS;

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={onBack} disabled={isLoading}>
                        <Text>Back</Text>
                    </Button>
                </Left>
                <Body>
                    <Text>Record</Text>
                </Body>
                <Right>
                    <Button transparent onPress={onCreate} disabled={isLoading}>
                        <Text>Create</Text>
                    </Button>
                </Right>
            </Header>
            <Content>
                <View><Text style={styles.errorMessage}>{ stores.recordStore.errorMsg }</Text></View>
                <View style={styles.padding}>
                    <TextInput value={doctor} label="Doctor" disabled={isLoading} mandatory={true} onChange={onDoctorChange}/>
                    <TextInput value={patient} label="Patient" disabled={isLoading} mandatory={true} onChange={onPatientChange}/>
                    <TextInput value={diagonsis} label="Diagonsis" disabled={isLoading} onChange={onDiagonsisChange}/>
                    <TextInput value={medication} label="medication" disabled={isLoading} onChange={onMedicationChange}/>
                    <DatePicker value={dateTime} type="date" label="Date" disabled={isLoading} onChange={onDateTimeChange} />
                    <DatePicker value={dateTime} type="time" label="Time" disabled={isLoading} onChange={onDateTimeChange} />
                    <NumberInput value={fee} type="decimal" label="Fee" disabled={isLoading} onChange={onFeeChange} />
                    <CheckBox value={followUp} label="FollowUp" disabled={isLoading} onChange={onFollowUpChange} />
                </View>
                {
                    isLoading ? <Spinner /> : null
                }
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    padding: {
        padding: 12
    },
    errorMessage: {
        height: 16,
        fontSize: 12,
        color: '#ff3333',
        textAlign: 'center'
    }
})

export default RecordCreatePage;