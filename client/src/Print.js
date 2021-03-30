import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image
} from "@react-pdf/renderer";
import Tajawal from "./fonts/Tajawal-Regular.ttf";
import logo from "./images/eelu.png";
const _ = require("underscore");

Font.register({
  family: "Tajawal",
  src: Tajawal,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    border: 30,
    textAlign: "right",
    direction: "rtl",
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Times New Roman",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: "5 12 5 12",
    fontSize: 12,
    textAlign: "right",
    fontFamily: "Times New Roman",
  },
  image: {
    marginVertical: 15,
    maxWidth: 100,
    marginRight: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section: {
    margin: 5,
    padding: 5,
    //flexGrow: 1,
  },
  department: {
    backgroundColor: "gray",
    paddingTop: 3,
    fontFamily: "Times New Roman",
    margin: 12,
    fontSize: 14,
    textDecoration: "underline",
    display: "inline-block",
  },
});

export default class Print extends React.Component {
  render() {
    console.log(this.props);
    var subjects = this.props.subjects;
    var number = this.props.meeting.number;
    var date = this.props.meeting.date;
    var subjectsGrouped = _.groupBy(subjects, "department");
    var index = 0;

    function SubjectGroup(props) {
      //console.log(props);
      return (
        <View style={styles.section}>
          {props.department && props.department !== "undefined" && (
            <Text style={styles.department}>{props.department}</Text>
          )}
          {props.subjects.map(function (subject) {
            if (subject) {
              index++;
              return (
                <Text style={styles.text}>
                  {" " + subject.subject + " "} : {" " + index + " "}الموضوع رقم
                </Text>
              );
            }
          })}
        </View>
      );
    }

    return (
      <Document>
        <Page size="A4" style={styles.body}>
          <Image style={styles.image} src={logo} fixed />
          <View style={styles.section}>
            <Text style={styles.title}>جدول اعمال</Text>
            <Text style={styles.title}>
              اجتماع مجلس الجامعة المصرية للتعلم الالكتروني الاهلية
            </Text>
            <Text style={styles.title}>
              {date} المنعقدة بتاريخ {" (" + number + ") "} الجلسة رقم
            </Text>
          </View>
          {Object.entries(subjectsGrouped).map(function (subject) {
            console.log(subject[0]);
            return (
              <SubjectGroup department={subject[0]} subjects={subject[1]} />
            );
          })}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  }
}
