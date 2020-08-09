//Imports
import React from 'react'
import { useSelector } from 'react-redux'
import PreLoader from '../Common/Preloader/Preloader'
import { getIsFetching } from '../../Redux/Selectors/userSelector'
import { Users } from './Users'


//UsersPage
export const UsersPage: React.FC = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <PreLoader /> : null}
        <Users />
    </>
}