import React, {useState, useEffect} from 'react';
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { useToasts } from "react-toast-notifications";
import classes from '*.module.css';
import DCandidates from './DCandidates';

const styles = theme => ({
   root: {
       '& .MuiTextField-root': {
           margin: theme.spacing(1),
           minWidth: 230,
       }
   },
   formControl: {
       margin: theme.spacing(1),
       minWidth: 230,
   },
   smMargin: {
       margin: theme.spacing(1)
   }
})

const initialFieldValues = {
   fullName: '',
   mobile: '',
   email: '',
   age: '',
   bloodGroup: '',
   address: ''
}

const DCandidateForm = ({classes, ...props})=>{

   const {addToast} = useToasts();

   const validate = (fieldValues = values)=>{
      let temp = {...errors}
      if('fullName' in fieldValues){
          temp.fullName = fieldValues.fullName? "": "This field is required.";
      }
      if('mobile' in fieldValues){
         temp.mobile = fieldValues.mobile? "": "This field is required.";
      }
      if('bloodGroup' in fieldValues){
         temp.bloodGroup = fieldValues.bloodGroup? "": "This field is required.";
      }
      if('email' in fieldValues){
         temp.email = fieldValues.email? "": "This field is required.";
      }
      setErros({
         ...temp
      })
      if(fieldValues == values){
          return Object.values(temp).every(x=>(x==""))
      }
   }

   const { 
      values,
       setValues,
       errors,
       setErrors,
       handleInputChange,
       resetForm
   } = useForm(initialFieldValues, validate, props.setCurrentId)

   const inputLabel = React.useRef(null);
   const [labelWidth, setLabelWidth] = useState(0);
   useEffect(()=>{
      setLabelWidth(inputLabel.current.offsetWidth);
   },[]);

   const handleSubmit = e=>{
      e.preventDefault();
      if(validate()){
         const onSuccess = ()=>{
            resetForm(),
            addToast('Submit successfully', { appearance: 'success' })
         }
      }
   } 

  useEffect(()=>{
     if(props.currentId != 0){
        setValues({
           ...props.DCandidateForm
        })
     }
  })

  return (
     <form autoComplete ="off" noValidate className={classes.root} onSubmit={handleSubmit}>

     </form>
  ) 
}

const  mapStateToProps = state =>({
   dCandidateList: state.dCandidate.list
});

const mapActionToProps = {
   createDCandidate: actions.create,
   updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));