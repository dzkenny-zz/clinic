import { NavigationProp, NavigationState } from "@react-navigation/core";
import { NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";

export type Navigation = NavigationProp<Record<string, object | undefined>, string, NavigationState, {}, {}>;

export type EndEditEvent = NativeSyntheticEvent<TextInputEndEditingEventData>;

export enum ActionState  {
    INITIAL = 'INITIAL',
    IN_PROGRESS = 'IN_PROGRESS',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE'
}

export type CalendarType = 'DAY' | 'WEEK' | 'MONTH';