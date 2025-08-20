import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function TillisonReceiptEmail({ booking }) {
  return (
    <Html>
      <Head />

      <Body style={main}>
        <Preview>Tillison Photography Receipt</Preview>
        <Container style={container}>
          <Section>
            <Row>
              <Column>
                <Img
                  src={`https://i.imgur.com/fduJ8ba.png`}
                  width="42"
                  height="42"
                  alt="Tillison Logo"
                />
              </Column>

              <Column align="right" style={tableCell}>
                <Text style={heading}>Receipt</Text>
              </Column>
            </Row>
          </Section>
          <Section></Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Link
                        style={{
                          ...informationTableValue,
                          color: "#15c",
                          textDecoration: "underline",
                        }}
                      >
                        {booking?.email}
                      </Link>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>INVOICE DATE</Text>
                      <Text style={informationTableValue}>
                        {new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableValue}>
                Name: {booking?.name || booking?.user?.last_name}
                </Text>
                <Text style={informationTableValue}>Location: {booking?.location}</Text>
                <Text style={informationTableValue}>Phone Number: {booking?.phone_number}</Text>
                <Text style={informationTableValue}>Email: {booking?.email}</Text>
              </Column>
            </Row>
          </Section>
          <Section>
            <Row>
              <Column style={{ paddingLeft: "22px" }}>
                <Link href="baseUrl" style={productLink}>
                  Write a Review
                </Link>
                <span style={divisor}>|</span>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLine} />
          <Hr style={productPriceLineBottom} />
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
  backgroundColor: "#ffffff",
};

const resetText = {
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "660px",
  maxWidth: "100%",
};

const tableCell = { display: "table-cell" };

const heading = {
  fontSize: "32px",
  fontWeight: "300",
  color: "#888888",
};

const informationTable = {
  borderCollapse: "collapse",
  borderSpacing: "0px",
  color: "rgb(51,51,51)",
  backgroundColor: "rgb(250,250,250)",
  borderRadius: "3px",
  fontSize: "12px",
};

const informationTableRow = {
  minHeight: "46px",
};

const informationTableColumn = {
  paddingLeft: "20px",
  borderStyle: "solid",
  borderColor: "white",
  borderWidth: "0px 1px 1px 0px",
  minHeight: "44px",
};

const informationTableLabel = {
  ...resetText,
  color: "rgb(102,102,102)",
  fontSize: "10px",
};

const informationTableValue = {
  fontSize: "12px",
  margin: "0",
  padding: "0",
  lineHeight: 1.4,
};
const productIcon = {
  margin: "0 0 0 20px",
  borderRadius: "14px",
  border: "1px solid rgb(242,242,242)",
};

const productLink = {
  fontSize: "12px",
  color: "rgb(0,112,201)",
  textDecoration: "none",
};

const divisor = {
  marginLeft: "4px",
  marginRight: "4px",
  color: "rgb(51,51,51)",
  fontWeight: 200,
};

const productPriceLine = { margin: "30px 0 0 0" };

const productPriceLineBottom = { margin: "0 0 75px 0" };

const block = { display: "block" };
