import React, {Component} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {connect} from "react-redux";
import {
    AddPartnerTag,
    DeleteAllPartnerTag,
    RemovePartnerTag,
} from "../../../../redux/actions/tagActions";


class PartnerTags extends Component{
    constructor(props) {
        super(props);
        this.state = {
            positiveTagsPartner : ['Reliable', 'Punctual', 'Super Partner'],
            negativeTagsPartner : ['Unreliable', 'Unpunctual', 'Bad Partner']
        }
        this.handleChangePartner = this.handleChangePartner.bind(this);
        this.handleChangePartnerN = this.handleChangePartnerN.bind(this);
    }

    handleChangePartner = (event, newFormats) => {
        this.props.DeleteAllPartnerTag();
        for(let i = 0 ; i< newFormats.length; i++){
            this.props.AddPartnerTag(newFormats[i]);
        }
    };
    handleChangePartnerN = ( event, newFormats) => {
        this.props.DeleteAllPartnerTag();
        for(let i = 0 ; i< newFormats.length; i++){
            this.props.AddPartnerTag(newFormats[i]);
        }
    };
    render(){
        return (
            <div>
                <div style={{display: this.props.children.rate >= 3 ? "block" : "none"}}>
                    <ToggleButtonGroup type="checkbox" value={this.props.partnerTags} onChange={this.handleChangePartner}>
                        <ToggleButton style={{ color: 'green'}} value={'Reliable'}>{this.state.positiveTagsPartner[0]}</ToggleButton>
                        <ToggleButton style={{ color: 'green'}} value={'Punctual'}>{this.state.positiveTagsPartner[1]}</ToggleButton>
                        <ToggleButton style={{ color: 'green'}} value={'Super Partner'}>{this.state.positiveTagsPartner[2]}</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div style={{display: this.props.children.rate < 3 ? "block" : "none"}}>
                    <ToggleButtonGroup type="checkbox" value={this.props.partnerTags} onChange={this.handleChangePartner} >
                        <ToggleButton  style={{ color: 'red'}} value={'Unreliable'} >
                            {this.state.negativeTagsPartner[0]}
                        </ToggleButton>
                        <ToggleButton style={{ color: 'red'}} value={'Unpunctual'} >
                            {this.state.negativeTagsPartner[1]}
                        </ToggleButton>
                        <ToggleButton style={{ color: 'red'}} value={'Bad Partner'}>
                            {this.state.negativeTagsPartner[2]}
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        backgroundColor: state.tagReducer.backgroundColor,
        color: state.tagReducer.color,
        partnerTags: state.tagReducer.partnerTags,
        processTags: state.tagReducer.processTags
    }
}
const mapActionToProps = {
    AddPartnerTag:AddPartnerTag,
    RemovePartnerTag : RemovePartnerTag,
    DeleteAllPartnerTag:DeleteAllPartnerTag,
}
export default connect(
    mapStateToProps,
    mapActionToProps
)(PartnerTags);