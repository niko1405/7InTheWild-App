import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  Linking,
} from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { urlFor } from "../../client";
import CustomText from "./CustomText";
import images from "../constants/images";

const collapsedState = {
  0: { all: false, gears: false },
  1: { all: false, gears: false },
  2: { all: false, gears: false },
  3: { all: false, gears: false },
  4: { all: false, gears: false },
  5: { all: false, gears: false },
  6: { all: false, gears: false },
};

const ParticipantList = ({ style, data }) => {
  const { darkMode } = useSelector((state) => state.settings);

  const [isCollapsed, setIsCollapsed] = useState(collapsedState);

  return (
    <View
      style={[
        style,
        {
          display: "flex",
          flexDirection: "column",
          borderTopWidth: 2,
          borderColor: darkMode ? "white" : "black",
          marginTop: 7,
          padding: 0,
        },
      ]}
    >
      <ImageBackground
        source={images.banner}
        resizeMode="cover"
        style={{ padding: 10 }}
      >
        {data.map((participant, i) => (
          <View
            key={i}
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: "white",
              marginBottom: 10,
            }}
          >
            <Collapse
              onToggle={(isCollapsed) => {
                setIsCollapsed((prevState) => ({
                  ...prevState,
                  [i]: { all: isCollapsed, gears: false },
                }));
              }}
            >
              <CollapseHeader>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingBottom: 10,
                    alignItems: "center",
                  }}
                >
                  <CustomText
                    style={{
                      marginRight: 5,
                    }}
                    color="#b0a0a2"
                    fontSize={25}
                    title={`${i + 1}.`}
                  />
                  <Image
                    source={
                      participant.profileImg
                        ? { uri: urlFor(participant.profileImg).url() }
                        : require("../assets/images/personPlaceholder.png")
                    }
                    borderRadius={100}
                    style={{
                      height: 60,
                      width: 60,
                      borderWidth: 2,
                      borderColor: "black",
                    }}
                  />
                  <CustomText
                    color="white"
                    fontSize={18}
                    title={participant.name}
                    style={{
                      marginLeft: 10,
                    }}
                  />
                  <Icon
                    name={isCollapsed[i].all ? "chevron-up" : "chevron-down"}
                    size={15}
                    color="white"
                    style={{ position: "absolute", right: 0 }}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: 10,
                    marginLeft: 5,
                  }}
                >
                  {participant.age?.length > 0 && (
                    <CustomText
                      color="white"
                      fontSize={16}
                      title={`Alter:   ${participant.age}`}
                      style={{
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        padding: 5,
                      }}
                    />
                  )}
                  {participant.weight?.length > 0 && (
                    <CustomText
                      color="white"
                      fontSize={16}
                      title={`Gewicht:   ${participant.weight}`}
                      style={{
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        padding: 5,
                      }}
                    />
                  )}
                  {participant.size?.length > 0 && (
                    <CustomText
                      color="white"
                      fontSize={16}
                      title={`Größe:   ${participant.size}`}
                      style={{
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        padding: 5,
                      }}
                    />
                  )}
                  {participant.body?.length > 0 && (
                    <CustomText
                      color="white"
                      fontSize={16}
                      title={`Körperbau:   ${participant.body}`}
                      style={{
                        marginLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "white",
                        padding: 5,
                      }}
                    />
                  )}
                  {participant.gears?.length > 0 && (
                    <Collapse
                      onToggle={(isCollapsed) => {
                        setIsCollapsed((prevState) => ({
                          ...prevState,
                          [i]: { all: true, gears: isCollapsed },
                        }));
                      }}
                    >
                      <CollapseHeader>
                        <View
                          style={{
                            marginLeft: 10,
                            padding: 5,
                            flexDirection: "row",
                            display: "flex",
                            position: "relative",
                            alignItems: "center",
                          }}
                        >
                          <CustomText
                            color="white"
                            fontSize={15}
                            title="GegenstÄnde:"
                          />
                          <Icon
                            name={
                              isCollapsed[i].gears
                                ? "chevron-up"
                                : "chevron-down"
                            }
                            size={10}
                            color="white"
                            style={{ position: "absolute", right: 20 }}
                          />
                        </View>
                      </CollapseHeader>
                      <CollapseBody>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginLeft: 20,
                          }}
                        >
                          {participant.gears.map((gear, i) => (
                            <CustomText
                              key={i}
                              fontSize={15}
                              color="white"
                              title={`${i + 1}. ${gear}`}
                            />
                          ))}
                        </View>
                      </CollapseBody>
                    </Collapse>
                  )}
                  <View style={{ padding: 10, marginTop: 10 }}>
                    <CustomText
                      fontSize={15}
                      title={participant.info}
                      color="white"
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="youtube-play"
                      size={25}
                      color={participant.youtube?.length > 0 ? "red" : "gray"}
                      style={{ marginRight: 15 }}
                      onPress={() => {
                        participant.youtube?.length > 0 &&
                          Linking.openURL(participant.youtube);
                      }}
                    />
                    <Icon
                      name="instagram"
                      size={25}
                      color={
                        participant.instagram?.length > 0 ? "pink" : "gray"
                      }
                      onPress={() => {
                        participant.instagram?.length > 0 &&
                          Linking.openURL(participant.instagram);
                      }}
                    />
                  </View>
                </View>
              </CollapseBody>
            </Collapse>
          </View>
        ))}
      </ImageBackground>
    </View>
  );
};

export default ParticipantList;

const styles = StyleSheet.create({
  font: {
    fontFamily: "header",
  },
});
