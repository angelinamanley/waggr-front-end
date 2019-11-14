
import React from 'react';
import { DateRange} from 'react-date-range'
import moment from 'moment'


class DateRangePicker extends React.Component{

    state = {
        range: ""
    }

    handleSelect = range => { 

        this.setState({ startDate: moment(range.startDate).format('LLL'), endDate: moment(range.endDate).format('LLL')}, ()=> this.props.setDateRange(this.state.startDate, this.state.endDate))
    }


    render() { 
    
        return( 

            <DateRange
            
            
            onClose= {this.handleSelect}
            onChange={this.handleSelect}

            />


        )

    }


}

export default DateRangePicker