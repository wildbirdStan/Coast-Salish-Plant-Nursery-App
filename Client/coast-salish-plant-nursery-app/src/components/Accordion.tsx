import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from "react-native";
import * as React from "react";
import { globalStyles } from "../styles/globalStyles";
const arrowdown = require("../images/arrow-down_white.png");
const arrowup = require("../images/arrow-up_white.png");

type AccordionProps = {
  title: string;
  children: React.JSX.Element;
  isItemCollapsed: boolean;
  onPress: () => void;
};

export default function Accordion(props: AccordionProps) {
  const { title, children, isItemCollapsed, onPress } = props;

  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.flexContainer, globalStyles.primaryButtonColor]}>
          <Text style={styles.text}>{props.title}</Text>
          <Image
            source={!isItemCollapsed ? arrowup : arrowdown}
            style={styles.image}
          />
        </View>
      </TouchableWithoutFeedback>

      <View>{!isItemCollapsed && props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    width: "100%",
    height: 50,
    paddingLeft: 19,
    paddingRight: 12,
    borderRadius: 5,
    backgroundColor: "lightgrey",
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  image: {
    width: 29,
    height: 29,
  },

  text: {
    fontSize: 18,
    color: "white",
  },
});
