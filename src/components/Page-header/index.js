import React, { PureComponent } from 'react'

import * as styles from './page-header.module.css'

export default class PageTitle extends PureComponent {
    
    render() {
        return (
            <h1 className={styles.page__header}>
                {this.props.title.toLowerCase()}
            </h1>
        )
    }
}
