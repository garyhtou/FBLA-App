
import {Text, View} from "react-native"
import {getCurUser} from "../config/user";

export default class Announcement extends React.Component {
    componentDidMount() {
        if(this.props.commentsEnabled === true){

        }
    }
    render(){
        let isAdmin = getCurUser().isAdmin;

        if(isAdmin && this.props.commentsEnabled) {
            return (
                <View>
                    <Text></Text>
                </View>
            )
        } else if(isAdmin){
            return (
                <View>
                    <Text></Text>
                </View>
            )
        } else if(this.props.commentsEnabled){
            return (
                <View>
                    <Text></Text>
                </View>
            )
        } else{
            return (
                <View>
                    <Text></Text>
                </View>
            )
        }
    }



}

const Comments=({})=>(
    <View>
        <Text></Text>
    </View>
);
