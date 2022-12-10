console.log("> Hello world!");

/*
* CONTEXT
* ===============================================================
* A task consists of a name and a series of blocks.
* 
* The blocks can be of the following types:
*  - text     => a simply text instruction
*  - question => a question text that also has an associated answer
*  - subtask  => an embeded task objects with a name and its own series of blocks 
* 
* Note: A subtask within the top level task can have more nested tasks...
* ===============================================================
*/



// Task Schema
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



/*
* QUESTION 1
* ===============================================================
* Given the above schema of a task, describe how you would implement 
* a view that renders the "block" components of the task dynamically.
* How would you handle nested subtasks?  
* 
* Note: Code snippets are okay to add / use if needed.
* ===============================================================
*/

/*** 

The above schema can be displayed in nested form using many ways and I will use
nested flatlists. In render item of the flatlist we can check the type of the current element
is subtask and if its subtask we can render the same component again with subtask data .
So in this way we can reuse the same flatlist again and again no matter how deep is nested subtasks are.
I created a sample code example and sharing along in seprate file.(took 30 minutes to create this example).
***/







/*
* QUESTION 2
* ===============================================================
* What is Redux and how does it work? 
* Given the previous question and above task schema, explain how the 
* state would be managed.
* ===============================================================
*/

/*** 

In react by default we can access the state on one component only and we can also pass it to other 
components using props but this is not the best practice when we are developing a large application.
So to avoid that we need a global state for our application. Redux is most popular state management 
library for react and we can use it to manage the state in one place and access it anywhere in our application.
In redux we have three main components action, reducer and store. Actions are plain javascript objects and 
we use dispatch method to dispatch these action to store , reducers handles them based on type of action and
 update the store using the provided payload.
 
 For the above schema.We will fetch the data from the api and save it in the store.
 Say Tasks is the name of variable in our redux store that will cache the task data.
 Just a simple example is as follows:
 const intialState = {
    tasks: []
 }
 const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    }
}
We can use a redux middleware such as Redux Saga to perform all the sideeffects 
and we can use reselect to create memoized selectors to fetch state using useSelector.
After that when ever we are adding a new answer we can refetch data and update the state accordingly.

Even redux is popular library but still there are better and more efficient alternatives are available now
such as Zustand (https://github.com/pmndrs/zustand) and Valtio (https://github.com/pmndrs/valtio).
I used them in many apps.


***/







/*
* QUESTION 3
* ===============================================================
* Let us consider we are trying to build a list view of all the 
* completed questions & answers from every task (including all nested subtasks).
*
* Given the task schema above, could you write a function or method
* to retrieve all question & answer pairs as a list or array?
*
* Note: You can use helper functions.
* Bonus: What is the time complexity of this? 
* ===============================================================
*/

// answer here
// Input: task (see schema above)
// Output: array of [{"question": "<>", "answer": "<>"}] where answer is not empty or null.
var questions = function(task){      
    let answeredArray = [], tmpArr = [];
    answeredArray = task.blocks.filter(t => {
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
// Approx. Time : 20 minutes









/*
* FEEDBACK
* ===============================================================
* Let us know if you have any feedback, comments, or suggestions
* regarding the interview processes, this assignment, or anything else.
* 
* Thank you!
* ===============================================================
*/

/*** 

answer here

***/