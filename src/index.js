import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Modal, TextInput } from 'react-native';
const task = {
    "name": "Car Maintenance",
    "blocks": [
        {
            "type": "text",
            "text": "Greet the customer and let them know why you are there."

        },

        {
            "type": "question",
            "text": "What is the car's current mileage?",
            "answer": "12345"

        },

        {
            "type": "subtask",
            "subtask": {

                "name": "Change Tires",
                "blocks": [
                    {
                        "type": "text",
                        "text": "Change and align the tires."

                    },

                    {
                        "type": "question",
                        "text": "What is the average tire pressure?",
                        "answer": "32PSI"
                    }

                ]

            }
        },

        {
            "type": "question",
            "text": "Was the customer happy with the service?",
            "answer": null

        },

        {
            "type": "text",
            "text": "Was the customer happy with the service?",

        },


    ]
}

const TaskItem = ({ item }) => {
    if (item.type == "subtask") {
        return <NestedFlatList data={item.subtask} />
    }
    return (<View style={styles.item}>
        <View style={{ flexDirection: 'row' }} >
            <Text style={styles.badge} >{item.type.toUpperCase()} </Text>
            <Text style={{ flex: 1, color: item.answer ? 'green' : 'red' }}>{item.text}</Text></View>
        {item.answer && <Text style={styles.answer} >Answer: {item.answer}</Text>}
    </View>)
}
const NestedFlatList = ({ data }) => {
    return (<View style={{ margin: 10, paddingLeft: 5, borderWidth: 1 }}>
        <Text style={styles.name} >
            {data.name}
        </Text>
        <FlatList
            data={data.blocks}
            renderItem={TaskItem}
        /></View>);
}
var questions = function (taskData) {
    // console.log("taskData", taskData);   
    let answeredArray = [], tmpArr = [];
    answeredArray = taskData.blocks.filter(t => {
        if (t.type == 'subtask') {


            tmpArr = tmpArr.concat(questions(t.subtask));

        }

        if (t.answer) {
            return true;
        }

    })
    answeredArray = answeredArray.concat(tmpArr);
    return answeredArray;
}

const App = () => {
    const [tasks, setTasks] = useState(task);
    const [answered, setAnswered] = useState([]);
    useEffect(() => {
        let ansCount = questions(tasks);
        console.log('answer====', ansCount);
        setAnswered(ansCount);
    }, []);
    return (<View>
        <Text style={styles.header} >Task List (Completed: {answered.length})</Text>
        <NestedFlatList data={tasks} />
    </View>)
}

export default App;

const styles = StyleSheet.create({
    badge: {
        padding: 2, margin: 3,
        color: "white", backgroundColor: 'grey',
        borderRadius: 5, alignItems: 'center',
        justifyContent: 'center'
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    answer: { fontSize: 16, fontWeight: 'bold' },
    header: { fontSize: 20, padding: 5 },
    item: { borderWidth: 1, padding: 5, margin: 2 }
});