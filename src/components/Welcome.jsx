import React, { useState, useRef } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthProvider";

export default function Welcome() {
  const { onLogin } = useAuth();
  const [displayPassword, setDisplayPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
 

  const handleDisplayClick = () => {
    setDisplayPassword(!displayPassword);
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="darkGrey"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              rounded="md"
              spacing={4}
              p="2rem"
              backgroundColor="grey"
              boxShadow="md"
            >
              <Heading color="">Welcome To ChatApp!</Heading>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={<EmailIcon color="darkGrey" />}
                    pointerEvents="none"
                  />
                  <Input
                    ref={emailRef}
                    type="email"
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    children={<LockIcon color="darkGrey" />}
                    pointerEvents="none"
                    color="grey"
                  />
                  <Input
                    ref={passwordRef}
                    type={displayPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button onClick={handleDisplayClick}>
                      {displayPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onLogin(emailRef.current?.value, passwordRef.current?.value);
                }}
                borderRadius={6}
                type="submit"
                variant="solid"
                backgroundColor="blue"
                width="full"
              >
                Login
              </Button>
              <Box>
                Don't have an account?{" "}
                <Link color="blue" href="/sign-up">
                  Sign Up
                </Link>
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
