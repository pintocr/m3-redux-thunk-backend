import React from 'react';
import { IAssetData, IAssetAction, assetsReadActionCreator } from '../App';
import { ActionType, IAction } from '../framework/IAction';

import axios from 'axios';

import { IWindow } from '../framework/IWindow';
declare let window: IWindow;

//this file defines the React component that renders a single asset to the browser window
//it also contains the logic to change asset properties and save the changes to the database
//most of the used React framework features are already explained in the comments of App.js
//so this code hopefully mostly explains itself ...

interface IProps {
    edit: boolean;
    asset: IAssetData;
}

interface IState {
    edit_mode: boolean;
}


export default class SimpleAsset extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleSwitchToEditMode = this.handleSwitchToEditMode.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRerenderTest = this.handleRerenderTest.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            edit_mode: props.edit,
        }

    }

    render() {

        //if the component is in edit mode, it will render different than if it just shows the data

        if (this.state.edit_mode)
            return (
                <tr>
                    <td><input type="text" name="name" value={this.props.asset.asset_name} onChange={this.handleNameChange} /></td>
                    <td><input type="number" name="value" value={this.props.asset.asset_value} onChange={this.handleValueChange} /> €</td>
                    <td>
                        <button onClick={this.handleSave} id={this.props.asset._id}>save</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter</button>
                    </td>
                </tr>
            )
        else
            return (
                <tr>
                    <td>{this.props.asset.asset_name}</td>
                    <td>{this.props.asset.asset_value} €</td>
                    <td>
                        <button onClick={this.handleSwitchToEditMode}>edit</button>
                        <button onClick={this.handleDelete} id={this.props.asset._id}>sell or dispose</button>
                        <button onClick={this.handleRerenderTest} >increase State Counter {window.CS.getUIState().counter}</button>
                    </td>
                </tr>
            )
    }
    handleSwitchToEditMode() {
        this.setState({ edit_mode: true });
    }

    handleNameChange(event: any) {
        const newAsset = this.props.asset;
        newAsset.asset_name =  event.target.value
        const action: IAssetAction = {
            type: ActionType.update_asset,
            asset: newAsset
        }
        window.CS.clientAction(action);
    }
    handleValueChange(event: any) {
        const newAsset = this.props.asset;
        newAsset.asset_value = event.target.value;
        const action: IAssetAction = {
            type: ActionType.update_asset,
            asset: newAsset
        }
        window.CS.clientAction(action);
    }

    
    handleSave(event: any) {
        this.setState({ edit_mode: false });
        window.CS.clientAction(assetsUpdateActionCreator(event, this.props.asset))
    }
    handleDelete(event: any) {
        window.CS.clientAction(assetsDeleteActionCreator(event))
    }

    handleRerenderTest(event: any) {
        const action: IAction = {
            type: ActionType.render_test,
        }
        window.CS.clientAction(action);
    }

}


function assetsDeleteActionCreator(event : any){
        const idAsset = event.target.id;
        return function (){
            axios.get('http://localhost:8080/assets/delete/' + idAsset).then(response => {
              window.CS.clientAction(assetsReadActionCreator())
            }).catch(function (error) { console.log(error); })
          }
}


function assetsUpdateActionCreator(event : any, asset : IAssetData){
    const idAsset = event.target.id;
    return function (){
        axios.post('http://localhost:8080/assets/update/' + idAsset, asset ).then(response => {
        }).catch(function (error) { console.log(error); })
      }
}
