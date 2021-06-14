import React, { useState, useEffect } from "react";
import "./App.css";
// import Form from "./Form";
// import FormOrder from "./FormOrder";
import Pizza from './Pizza'
import PizzaForm from './PizzaForm'
import axios from "axios";
//import formSchema from './Validation/formSchema'
import * as yup from 'yup'


const initialFormValues = {
  name:"",
  size: "",
  ///// RADIO BUTTONS /////
  sauce: "",
  toppings: {
    pepperoni: false,
    pineapple: false,
    ham: false,
    olives: false,
    bacon: false,
    cheddar: false
  },
  special: ""
};

const initialFormErrors = {
 name:''
};
const initialPizzas = [];
const initialDisabled = true;

export default function PizzaApp() {
  const [friends, setFriends] = useState([initialPizzas]); // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
//   const [formErrors, setFormErrors] = useState(initialFormErrors); // object
//   const [disabled, setDisabled] = useState(initialDisabled);

//   const getFriends = () => {
//     // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
//     //    helper to [GET] all friends from `http://localhost:4000/friends`
//     axios.get('https://reqres.in/api/users')
//       .then(res => {
//         setFriends(res.data.data)
//       })
//       .catch(err => {
//         debugger
//       })
//   }
  const postNewFriend = (newFriend) => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios
      .post("https://reqres.in/api/users", newFriend)
      .then((res) => {
        // setFriends(friends.concat(res.data))
        setFriends([...friends, res.data]);
      })
      .catch((err) => {
        debugger;
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };
  const inputChange = (name, value) => {
    // yup
    // .reach(formSchema, name)

    // .validate(value)
  
    // .then(valid => {
    //   setFormErrors({
    //     ...formErrors,
    //     [name]: "",
    //   })
    // })
    
    // .catch(err => {
    //   setFormErrors({
    //     ...formErrors,
    //     [name]: err.errors[0],
    //   })
    // })
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    });
  };
  const checkboxChange = (name, isChecked) => {
    // 🔥 STEP 7- IMPLEMENT!
    //  set a new state for the whole form
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked
      }
    });
  };
  const submit = () => {
    const newFriend = {
      name: formValues.name,
      size: formValues.size,
      sauce: formValues.sauce,
      // 🔥 STEP 8- WHAT ABOUT HOBBIES?
      toppings: Object.keys(formValues.toppings).filter(
        (hob) => formValues.toppings[hob]
      ),
      special: formValues.special
    };
    // 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend);
  };
//   useEffect(() => {
//     // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
//     formSchema.isValid(formValues)
//       .then(valid => {
//         setDisabled(!valid);
//       })
//   }, [formValues])
  
  

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1> Pizza</h1>
        </header>

        <PizzaForm
          values={formValues}
          inputChange={inputChange}
          checkboxChange={checkboxChange}
          submit={submit}
        //   disabled={disabled}
        //   errors={formErrors}
        />

        {friends.map((friend) => {
          return <Pizza key={friend.id} details={friend} />;
        })}
      </div>
    </div>
  );
}
