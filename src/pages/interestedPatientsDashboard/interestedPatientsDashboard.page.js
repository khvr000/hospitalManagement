import React, {Component} from 'react';
import {
    getAdmittedPatients, getInterestFilledPatients,
    getPaymentDetailsForAdmissionNumber, savePaymentDetailsForAdmissionNumber,
    setEditModeForAdmitForm
} from "../../store/auth/auth.actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import AdminDashboardComponent from "../../components/admin-dashboard/admin-dashboard.component";
import InterestedPatientsDashboardComponent
    from "../../components/interested-patients-dashboard/interested-patients-dashboard.component";

class InterestedPatientsDashboardPage extends Component {

    state = {
        selectedInterestFormNumber: null,
    }

    componentDidMount() {
        this.props.getInterestFilledPatients();
    }

    render() {
        const { interestedPatients } = this.props;
        const { selectedInterestFormNumber } = this.state;
        const admittedPatientsArray = Object.values(interestedPatients);
        return (
                <>
                    <Helmet defer={false}>
                        <title>Hospital Management</title>
                        <meta
                            name="description"
                            content="AI Annotation tool for 3D and 2D bounding boxes, polygons, points, lanes. Supports instance and semantic segmentation."
                        />
                    </Helmet>


                    <div className="admin-dashboard-main-container">
                        <InterestedPatientsDashboardComponent
                            selectedInterestFormNumber={selectedInterestFormNumber}
                            admittedPatientsArray={admittedPatientsArray}
                            // handleSetSelectedAdmissionNumber={this.handleSetSelectedAdmissionNumber}
                            // onEditAdmitFormClick={this.onEditAdmitFormClick}
                        />
                    </div>
                </>
        );
    }
}

const mapStateToProps = state => {
    return {
        // selectedAdmissionNumber: state.auth.selectedAdmissionNumber,
        // paymentDetailsData: state.auth.paymentDetailsData,
        interestedPatients: state.auth.interestedPatients,
        // setGetPaymentDetailsForAdmissionNumberCallStatus: state.auth.setGetPaymentDetailsForAdmissionNumberCallStatus
    }
};

const mapDispatchToProps = dispatch => ({
    getInterestFilledPatients: (...args) => dispatch(getInterestFilledPatients(...args)),
    setEditModeForAdmitForm: (...args) => dispatch(setEditModeForAdmitForm(...args)),
    getPaymentDetailsForAdmissionNumber: (...args) => dispatch(getPaymentDetailsForAdmissionNumber(...args)),
    savePaymentDetailsForAdmissionNumber: (...args) => dispatch(savePaymentDetailsForAdmissionNumber(...args)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterestedPatientsDashboardPage));
