import React, {useCallback, useMemo, useState} from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import {Slider} from '@react-native-assets/slider';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation, useRoute } from '@react-navigation/native';

function ResultScreen(): JSX.Element {
  const [tip, setTip] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params;

  const navigateBack = () => {
    navigation.goBack();
  }

  const dropdownData = [
    {label: '1 person', value: 1},
    {label: '2 people', value: 2},
    {label: '3 people', value: 3},
    {label: '4 people', value: 4},
    {label: '5 people', value: 5},
    {label: '6 people', value: 6},
    {label: '7 people', value: 7},
    {label: '8 people', value: 8},
    {label: '9 people', value: 9},
    {label: '10 people', value: 10},
  ];

  const onTypeTip = useCallback((newTip: string) => {
    if (parseInt(newTip) <= 100) {
      setTip(newTip);
    } else {
      setTip('100');
    }
  }, []);

  const onTipSlide = useCallback((value: number) => {
    setTip(value.toString());
  }, []);

  const eachPersonPays = useMemo(() => {
    let amount = parseInt(params.amount);
    if (parseInt(tip)) {
      amount = amount + amount * (parseInt(tip) / 100);
    }
    const eachPerson = amount / numberOfPeople;

    return eachPerson;
  }, [tip, numberOfPeople])

  return (
    <View
      style={{backgroundColor: 'lightgray', flex: 1, justifyContent: 'center'}}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Split bill results
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          margin: 20,
          borderRadius: 10,
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{height: 40, borderRadius: 100}}
          inputMode={'numeric'}
          placeholder="Type your tip percentage here"
          onChangeText={onTypeTip}
          defaultValue={tip}
        />
      </View>
      <View style={{marginHorizontal: 40}}>
        <Dropdown
          data={dropdownData}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={'Select number of people'}
          value={numberOfPeople}
          onChange={item => {
            setNumberOfPeople(item.value);
          }}
        />
        <Slider
          value={0}
          minimumValue={0}
          maximumValue={100}
          step={1}
          onValueChange={onTipSlide}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '600',
            marginTop: 100,
          }}>
          Each person pays: {eachPersonPays.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: 'black',
            alignSelf: 'center',
            padding: 10,
            borderRadius: 18,
            marginTop: 20,
          }}
          onPress={navigateBack}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              textAlign: 'center',
              color: 'white',
            }}>
            Go back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ResultScreen;
