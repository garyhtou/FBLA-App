import React from 'react'
import { Text, View, TextInput, TouchableOpacity, CheckBox} from 'react-native'
import strings from '../config/strings'
import styles from '../config/styles'
import colors from '../config/colors'
import firebase from '../config/firebase'
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class JoinChapterScreen extends React.Component {


    state = {
      action:'',
      joinChapterName:'',
      newChapterName:'',
      selectedItems: []
    };

    joinChapter = () => {
      this.setState({action: 'Join Existing'})

    }

    createChapter = () => {
      this.setState({action: 'Create New'})
    }

    render() {

        return(
          <View style = {styles.container}>
            <Text style={styles.heading}>Join a Chapter!</Text>
            <CheckBox
                title='Join Existing Chapter'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.action === 'Join Existing'}
                onPress={this.joinChapter}
            />
            <CheckBox
                title='Create New Chapter'
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.action === 'Create New'}
                onPress={this.createChapter}
            />
            <View style={{marginTop: 32}}>
                <Text style={styles.authLabelText}>Chapter Name</Text>
                <TextInput
                    style={styles.authInput}
                    autoCapitalize="none"
                    onChangeText={newChapterName => this.setState({newChapterName})}
                    value={this.state.newChapterName}/>
            </View>

              <SearchableDropdown
                onItemSelect={(item) => {
                  const items = this.state.selectedItems;
                  items.push(item)
                  this.setState({ joinChapter:item.name, selectedItems: items });

                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(item, index) => {
                  const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                  this.setState({ selectedItems: items });
                }}
                itemStyle={{
                  padding: 10,
                  marginTop: 2,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={items}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                  {
                    placeholder: "placeholder",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                    onTextChange: text => alert(text)
                  }
                }
                listProps={
                  {
                    nestedScrollEnabled: true,
                  }
                }
          />


          </View>
        )
    }
}
