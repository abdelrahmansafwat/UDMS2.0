import React from "react";
const _ = require("underscore");

export default class Print extends React.Component {
  render() {
    var subjects = this.props.subjects;
    var number = this.props.meeting.number;
    var date = this.props.meeting.date;
    var subjectsGrouped = _.groupBy(subjects, "department");
    var index = 0;

    function SubjectGroup(props) {
      return (
        <div>
          <mark style={{ backgroundColor: "gray" }}>{props.key}</mark>
          {props.values.map(function (subject) {
            if (subject) {
              index++;
              return (
                <p>
                  Subject #{index}: {subject.subject}
                </p>
              );
            }
          })}
        </div>
      );
    }

    return (
      <div
        style={{
          margin: 50,
        }}
      >
        <div>
          <center>
            <h3>Board meeting for National Egyptian E-Learning University</h3>
            <h3>
              Meeting number ({number}) on {date}
            </h3>
          </center>
        </div>

        <div>
          {Object.entries(subjectsGrouped).map(function (subject) {
            return <SubjectGroup key={subject[0]} values={subject[1]} />;
          })}
        </div>
      </div>
    );
  }
}
