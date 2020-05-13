import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as action from "../actions/dCandiate"
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
   root: {
      "& .MuiTableCell-head": {
         fontSize: "1.24rem"
      }
   },
   pager: {
      margion: theme.spacing(2),
      padding: theme
   }
})

const DCandidates = ({ classes, ...props }) => {

   const [currentId, setCurrentId] = useState(0);
   const onDelete = id => {
      if (window.confirm('Are you want to delete')) {
         props.deleteDCandidate(id, () => addToast('Delete successfully', { appearance: 'info' }))
      }
   }

   return (
      <Pager className={classes.pager} elevation={3}>
         <Grip container>
            <Grid item xs={6}>
               <DCandidateForm {...({ currentId, setCurrentId })} />
            </Grid>
            <Grid item xs={6}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Blood group</TableCell>
                        <TableCell></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        props.dCandiateList.map((record, index) => {
                           return (<TableRow key={index} hover>
                              <TableCell>{record.fullName}</TableCell>
                              <TableCell>{record.mobile}</TableCell>
                              <TableCell>{record.bloodGroup}</TableCell>
                              <TableCell><ButtonGroup variant="text">
                                 <Button><EditIcon color="primary"
                                    onClick={() => { setCurrentId(record.id) }} /></Button>
                                 <Button><DeleteIcon color="secondary"
                                    onClick={() => onDelete(record.id)} /></Button>
                              </ButtonGroup></TableCell>

                           </TableRow>)
                        })
                     }
                  </TableBody>
               </Table>
            </Grid>
         </Grip>
      </Pager>
   )

}

const mapStateToProps = state => ({
   dCandiateList: state.dCandiate.list
})

const mapActionToProps = {
   fetchAllDCandidates: action.fetchAll,
   deleteDCandidate: action.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));