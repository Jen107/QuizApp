import React, {Component} from 'react'
import { BiBrain } from 'react-icons/bi'
import { IconContext } from 'react-icons/lib'



export default class Logo extends Component{
    render(){

        return (
            <div>
                    <div className="logoDiv">
                        <h1><BiBrain /> Quizzler </h1>
                    </div>
            </div>
        )
    }
}
