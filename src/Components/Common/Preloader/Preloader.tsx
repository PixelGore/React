//Imports
import React from 'react';
import preLoader from '../../../assets/Images/preLoader.svg'
import s from './Preloader.module.css'


//Preloader Component
let PreLoader: React.FC = () => {
    return (<div className={s.preLoader}><img src={preLoader} alt='preloader' /></div>)
}


//Export
export default PreLoader;