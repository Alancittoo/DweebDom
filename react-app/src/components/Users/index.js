import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetPins } from "../../store/pin";
import { thunkGetBoards } from "../../store/board";
import { thunkGetUserComments } from "../../store/comment";

function UserProfile(){
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)



}


export default UserProfile
