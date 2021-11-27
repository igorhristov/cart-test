import React, { PureComponent } from 'react'
import PageTitle from '../../components/Page-header'
import * as styles from './Homepage.module.css'

export default class Homepage extends PureComponent {
    render() {
        return (
            <>
            <PageTitle title="home"/>
               <div className={styles.home}>
                   Home Page
               </div>
            </>
        )
    }
}
