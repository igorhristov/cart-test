import React, { PureComponent } from 'react'

import * as styles from './product-wrapper.module.css'

export default class ProductWrapper extends PureComponent {
    render() {
        return (
            <div className={styles.products__wrapper} style={{display:'grid'}}>
                {this.props.children}
            </div>
        )
    }
}
