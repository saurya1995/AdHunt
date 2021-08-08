import React, {Component} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {connect} from "react-redux";
import {
    AddProcessTag,
    DeleteAllProcessTag,
    RemoveProcessTag
} from "../../../../redux/actions/tagActions";
class ProcessTags extends Component{
    constructor(props) {
        super(props);
        this.state = {
            positiveTagsProcess : ['Smooth', 'Practical', 'Super Satisfied'],
            negativeTagsProcess : ['Annoying', 'Impractical', 'Unsatisfied'],
        }
        this.handleChangeProcess = this.handleChangeProcess.bind(this);
    }
    handleChangeProcess = (event, newFormats) => {
        this.props.DeleteAllProcessTag();
        for(let i = 0 ; i< newFormats.length; i++){
            this.props.AddProcessTag(newFormats[i]);
        }
    };

    render(){
        return (
            <div>
                <div style={{display: this.props.children.rate >= 3 ? "block" : "none"}}>
                    <ToggleButtonGroup type="checkbox" value={this.props.processTags} onChange={this.handleChangeProcess}>
                        <ToggleButton style={{ color: 'green'}}  value={this.state.positiveTagsProcess[0]}>{this.state.positiveTagsProcess[0]}</ToggleButton>
                        <ToggleButton style={{ color: 'green'}}  value={this.state.positiveTagsProcess[1]}>{this.state.positiveTagsProcess[1]}</ToggleButton>
                        <ToggleButton style={{ color: 'green'}}  value={this.state.positiveTagsProcess[2]}>{this.state.positiveTagsProcess[2]}</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div style={{display: this.props.children.rate < 3 ? "block" : "none"}}>
                    <ToggleButtonGroup type="checkbox" value={this.props.processTags} onChange={this.handleChangeProcess}>
                        <ToggleButton style={{ color: 'red'}}  value={this.state.negativeTagsProcess[0]}>{this.state.negativeTagsProcess[0]}</ToggleButton>
                        <ToggleButton style={{ color: 'red'}} value={this.state.negativeTagsProcess[1]}>{this.state.negativeTagsProcess[1]}</ToggleButton>
                        <ToggleButton style={{ color: 'red'}} value={this.state.negativeTagsProcess[2]}>{this.state.negativeTagsProcess[2]}</ToggleButton>
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
    AddProcessTag:AddProcessTag,
    RemoveProcessTag:RemoveProcessTag,
    DeleteAllProcessTag:DeleteAllProcessTag

}
export default connect(
    mapStateToProps,
    mapActionToProps
)(ProcessTags);