import React, { useRef, useState, forwardRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../styles/style";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomTextInput = forwardRef(
  (
    {
      control,
      fieldName,
      header,
      defaultValue,
      placeholder,
      rules = {},
      keyboardType,
      maxLength,
      returnKeyType,
      secureTextEntry,
      multiline,
      numberOfLines,
      onSubmitEditing,
      focusNextInput,
      handleSubmit,
      passwordInput,
    },
    ref
  ) => {
    const inputRef = useRef(null);

    const handleOnSubmitEditing = () => {
      if (onSubmitEditing) {
        onSubmitEditing();
      }

      if (focusNextInput) {
        focusNextInput(inputRef);
      }

      if (handleSubmit) {
        handleSubmit();
      }
    };

    useEffect(() => {
      if (ref) {
        ref.current = {
          focusInput: () => {
            inputRef.current?.focus();
          },
        };
      }
    }, [fieldName, ref]);

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <View>
        <Controller
          control={control}
          name={fieldName}
          rules={rules}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              {error ? (
                <Text style={styles.inputHeaderError}>
                  {error.message || "Error"}
                </Text>
              ) : (
                <Text style={styles.inputHeader}>{header}</Text>
              )}
              <View>
                <TextInput
                  onBlur={onBlur}
                  value={value}
                  defaultValue={defaultValue || ""}
                  onChangeText={onChange}
                  placeholder={placeholder}
                  secureTextEntry={passwordInput ? !showPassword : false}
                  style={[
                    styles.input,
                    error ? styles.inputError : null,
                    multiline ? { height: numberOfLines * 40 } : null,
                    multiline ? styles.multiline : null,
                  ]}
                  keyboardType={keyboardType}
                  maxLength={maxLength}
                  returnKeyType={returnKeyType}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                  resizeMode={"none"}
                  onSubmitEditing={handleOnSubmitEditing}
                  ref={inputRef}
                />
                {passwordInput ? (
                  <TouchableOpacity
                    onPress={togglePassword}
                    style={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  >
                    <Icon name={showPassword ? "eye-slash" : "eye"} size={30} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </>
          )}
        />
      </View>
    );
  }
);

export default CustomTextInput;
