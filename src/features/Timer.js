import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import {ProgressBar} from 'react-native-paper';
import {colors} from '../utils/colors'
import {Timing} from './Timing'
import {useKeepAwake} from 'expo-keep-awake';


const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
      1 * ONE_SECOND_IN_MS,
      2 * ONE_SECOND_IN_MS,
      3 * ONE_SECOND_IN_MS
    ];

    const PATTERN_DESC =
      Platform.OS === "android"
        ? "wait 1s, vibrate 2s, wait 3s"
        : "wait 1s, vibrate, wait 2s, vibrate, wait 3s";


export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(400);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar 
          color={colors.progressBar}
          style={{height: spacing.sm}}
          progress={progress}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="Back" onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  countdown: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper:{
    height: '10%',
    padding: spacing.xxl,
    flexDirection: 'row'
  },
  clearSubject:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  buttonWrapper: {
    height: '30%',
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  task:{
    color: 'white',
    textAlign: 'center',
  },
});
