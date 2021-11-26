
import React, { Component } from 'react'
import {AddListTable} from './AddListTable'


class Listadd extends Component {
    render() {
        return (
            <div>
                <div className='Container m-5'>
                  <div className='row'>
                    <AddListTable />
                  </div>
                </div>  
            </div>
        )
    }
}

export default Listadd
