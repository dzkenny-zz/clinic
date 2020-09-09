import React from 'react';
import { Overlay } from 'react-native-elements';
import { useStores } from '../../stores';
import { Spinner, Text } from 'native-base';
import { observer } from 'mobx-react';

const Loading = observer(() => {
    const stores = useStores();
    return (
        <Overlay 
            isVisible={stores.appStore.isLoading}
        >
            <>
                <Spinner />
                <Text>{ stores.appStore.loadingMessage } </Text>
            </>
        </Overlay>
    );
});

export default Loading;