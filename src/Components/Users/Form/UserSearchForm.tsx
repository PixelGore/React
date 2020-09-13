//Imports
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../../Redux/Reducers/usersReducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../../Redux/Selectors/userSelector';


export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)


    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void; }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChange(filter)
        setSubmitting(false)
    };

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
                validate={UserSearchFormValidate}
                onSubmit={submit}>

                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" placeholder="Type here to search users..." />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>Search</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
})
type PropsType = {
    onFilterChange: (filter: FilterType) => void
}
type FormType = {
    term: string
    friend: FriendFormType
}
type FriendFormType = "true" | "false" | "null";

const UserSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
};