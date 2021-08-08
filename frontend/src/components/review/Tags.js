import React, {Component} from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {connect} from "react-redux";
import {
    AddPartnerTag,
    AddProcessTag,
    DeleteAllPartnerTag, DeleteAllProcessTag,
    RemovePartnerTag,
    RemoveProcessTag
} from "../../redux/actions/tagActions";
class Tags extends Component{
    constructor(props) {
        super(props);
        this.state = {
            positiveTagsProcess : ['Smooth', 'Practical', 'Super Satisfied'],
            positiveTagsPartner : ['Reliable', 'Punctual', 'Super Partner'],
            negativeTagsProcess : ['Annoying', 'Impractical', 'Unsatisfied'],
            negativeTagsPartner : ['Unreliable', 'Unpunctual', 'Bad Partner']
        }
        this.handleChangeProcess = this.handleChangeProcess.bind(this);
        this.handleChangePartner = this.handleChangePartner.bind(this);
        this.handleChangeProcessN = this.handleChangeProcessN.bind(this);
        this.handleChangePartnerN = this.handleChangePartnerN.bind(this);
    }
    handleChangeProcess = (val) => {
        this.props.DeleteAllProcessTag();
        for(let i = 0 ; i< val.length; i++){
            this.props.AddProcessTag(this.state.positiveTagsProcess[val[i]-1]);
        }
    };
    handleChangePartner = (val) => {
        this.props.DeleteAllPartnerTag();
        for(let i = 0 ; i< val.length; i++){
            this.props.AddPartnerTag(this.state.positiveTagsPartner[val[i]-1]);
        }
    };
    handleChangeProcessN = (val) => {
        this.props.DeleteAllProcessTag();
        for(let i = 0 ; i< val.length; i++){
            this.props.AddProcessTag(this.state.negativeTagsProcess[val[i]-1]);
        }
    };
    handleChangePartnerN = (val) => {
        this.props.DeleteAllPartnerTag();
        for(let i = 0 ; i< val.length; i++){
            this.props.AddPartnerTag(this.state.negativeTagsPartner[val[i]-1]);
        }
    };

    render(){
        //TODO remove this some time, use state instead
        let positiveTagsProcess = ['Smooth', 'Practical', 'Super Satisfied'];
        let positiveTagsPartner = ['Reliable', 'Punctual', 'Super Partner'];
        let negativeTagsProcess = ['Annoying', 'Impractical', 'Unsatisfied'];
        let negativeTagsPartner = ['Unreliable', 'Unpunctual', 'Bad Partner'];

    return (
        <div>
            <div style={{display: this.props.children.process >= 3 ? "block" : "none"}}>
                <ToggleButtonGroup type="checkbox" value={this.props.processTags} onChange={this.handleChangeProcess}>
                    <ToggleButton value={1}>{positiveTagsProcess[0]}</ToggleButton>
                    <ToggleButton value={2}>{positiveTagsProcess[1]}</ToggleButton>
                    <ToggleButton value={3}>{positiveTagsProcess[2]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{display: this.props.children.process < 3 ? "block" : "none"}}>
                <ToggleButtonGroup type="checkbox" value={this.props.processTags} onChange={this.handleChangeProcessN}>
                    <ToggleButton value={1}>{negativeTagsProcess[0]}</ToggleButton>
                    <ToggleButton value={2}>{negativeTagsProcess[1]}</ToggleButton>
                    <ToggleButton value={3}>{negativeTagsProcess[2]}</ToggleButton>
                </ToggleButtonGroup>
            </div>{' '}
            <div style={{display: this.props.children.partner >= 3 ? "block" : "none"}}>
                <ToggleButtonGroup type="checkbox" value={this.props.partnerTags} onChange={this.handleChangePartner}>
                    <ToggleButton value={1}>{positiveTagsPartner[0]}</ToggleButton>
                    <ToggleButton value={2}>{positiveTagsPartner[1]}</ToggleButton>
                    <ToggleButton value={3}>{positiveTagsPartner[2]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div style={{display: this.props.children.partner < 3 ? "block" : "none"}}>
                <ToggleButtonGroup type="checkbox" value={this.props.partnerTags} onChange={this.handleChangePartnerN}>
                    <ToggleButton value={1}>{negativeTagsPartner[0]}</ToggleButton>
                    <ToggleButton value={2}>{negativeTagsPartner[1]}</ToggleButton>
                    <ToggleButton value={3}>{negativeTagsPartner[2]}</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
}
}

const mapStateToProps = state =>{
    return{
        backgroundColor: state.backgroundColor,
        color: state.color,
        partnerTags: state.partnerTags,
        processTags: state.processTags
    }
}
const mapActionToProps = {

    AddPartnerTag:AddPartnerTag,
    RemovePartnerTag : RemovePartnerTag,
    DeleteAllPartnerTag:DeleteAllPartnerTag,
    AddProcessTag:AddProcessTag,
    RemoveProcessTag:RemoveProcessTag,
    DeleteAllProcessTag:DeleteAllProcessTag

}
export default connect(
    mapStateToProps,
    mapActionToProps
)(Tags);