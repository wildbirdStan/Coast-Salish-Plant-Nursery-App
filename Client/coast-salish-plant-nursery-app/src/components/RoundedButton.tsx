import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

type RoundedButtonProps = {
  text: string;
  button: "primary" | "secondary";
  onClick: () => Promise<void>;
};

export default function RoundedButton(props: RoundedButtonProps) {
  const { text, button, onClick } = props;
  return (
    <>
      <TouchableWithoutFeedback onPress={onClick}>
        <View
          style={[
            styles.container,
            button == "primary"
              ? styles.primaryBackgroundColor
              : styles.secondaryBackgroundColor,
          ]}
        >
          <Text
            style={[
              styles.text,
              button == "primary" ? styles.primaryColor : styles.secondaryColor,
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 65,
    borderRadius: 15,
  },
  primaryBackgroundColor: {
    backgroundColor: "grey",
  },

  secondaryBackgroundColor: {
    backgroundColor: "lightgrey",
  },

  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

  primaryColor: {
    color: "white",
  },

  secondaryColor: {
    color: "black",
  },
});
