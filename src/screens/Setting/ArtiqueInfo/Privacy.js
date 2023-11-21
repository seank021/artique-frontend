import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

import { useNavigation } from "@react-navigation/native";

export default function Privacy ({ isCookie }) {
  const nav = useNavigation();

  const goBack = () => {
    nav.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 바 */}
      <View style={tw`flex-row justify-between items-center mt-5 mb-[14px]`}>
            <Pressable onPress={goBack} style={tw`flex-row`}>
                <Image source={require('@images/chevron_left.png')} style={tw`ml-[20px] w-[10px] h-[18px] tint-[#191919]`}></Image>
            </Pressable>
            <Text style={tw`text-[#191919] text-base font-medium`}>개인정보 처리 방침</Text>
            <View style={tw`mr-[20px]`}></View>
        </View>
        <View style={tw`border-solid border-b border-[#D3D4D3]`}></View>
      
      {/* 처리방침 */}
      <ScrollView style={tw`w-[90%] mt-5 mx-auto`} showsVerticalScrollIndicator={false}>
        <Text style={tw`text-sm text-[#191919] font-normal leading-[19px]`}>
          {privacy}
        </Text>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
  },
});

const privacy = `
개인정보 처리방침
본 방침은 2023년 11월 19일부터 적용됩니다.

총칙
범객(이하 "회사"라 함)은 개인정보보호 관한 법률을 준수하며 회원님의 개인정보가 보호받을 수 있도록 최선을 다하고 있습니다. 회사는 개인정보처리방침의 공개를 통하여 회원 여러분의 개인정보 가 어떠한 목적과 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지를 알려드립니다.
본 개인정보처리방침은 관련법령의 개정이나 당사 내부방침에 의해 변경될 수 있으며, 이를 개정하는 경우 회사는 변경사항에 대하여 서비스 화면에 게시합니다. 회원님께서는 Artique App 접속 시 수시로 확인하시기 바랍니다.

[개인정보 처리 목적]
회사는 이용자의 개인정보를 다음의 목적 이외의 용도로는 이용하지 않으며, 이용 목적이 변경될 경우에는 동의를 받아 처리하겠습니다.
① 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별, 부정 이용 방지, 가입의사 확인, 문의사항 또는 불만처리 등 민원처리, 분쟁조정 해결을 위한 기록 보존, 고지사항 전달
② 서비스 제공에 관한 계약의 이행: 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증
③ 신규 서비스 및 마케팅에 활용: 이용자에게 최적화된 서비스 제공, 이용자의 관심 및 성향 추정에 따른 맞춤형 컨텐츠 추천, 신규 서비스 및 상품 개발, 이벤트 정보 및 광고성 정보 제공 등 마케팅 및 프로모션, 접속 빈도 파악, 프라이버시 보호 측면의 서비스 환경 구축 및 개선, 서비스 유지관리 및 품질 향상 

[수집하는 개인정보의 항목범위 및 수집 방법]
회사는 다음과 같은 방식으로 개인정보를 수집합니다.
① 회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우 개인정보를 수집합니다.
② 온라인, 오프라인에서 진행되는 이벤트 등을 통해 이름, 휴대전화번호, 주소 등 추가적인 개인정보가 수집될 수 있습니다.
③ 제휴 회사로부터의 제공을 통해 개인정보가 수집될 수 있습니다.

④ 고객센터를 통한 상담 과정에서 이메일, 팩스, 전화 등을 통해 개인정보가 수집될 수 있습니다.
⑤ 회원 대상 맞춤형 추천 서비스 제공을 목적으로 이용자를 특정할 수 없는 이용한 서비스의 정보, 접속시간 및 빈도 등의 행태 정보를 수집할 수 있습니다.
⑥ 기기정보와 같은 생성정보는 PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집될 수 있습니다.

회사는 기본적 인권침해의 우려가 있는 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)를 요구하지 않으며, 위의 항목 이외에 다른 어떠한 목적으로도 수집, 사용하지 않습니다.

[개인정보의 제3자 제공]
회사는 원칙적으로 이용자 동의 없이 개인정보를 외부에 공개하지 않습니다. 다만, 다양한 혜택을 제공하기 위해 외부 제휴사에 개인 정보를 제공합니다. 제공이 필요한 경우 회사는 사전에 회원에게 '개인정보를 제공받는 자, 제공목적, 제공하는 개인정보 항목, 제공 받는 개인정보의 보유 및 이용기간'을 고지하고 이에 대해 명시적•개별적 동의를 얻습니다.
다만, 아래의 경우에는 예외로 합니다.
① 이용자가 사전에 동의한 경우
② 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정개인을 식별할 수 없는 형태로 제공하는 경우
③ 영업의 양도•합병 등에 관한 사유가 발생하는 경우(단, 회사는 영업의 양도 등에 관한 사유가 발생하여 이용자의 개인정보 이전이 필요한 경우, 관계법률에서 규정한 절차와 방법에 따라 개인정보 이전 에 관한 사실 등을 사전에 고지하며, 이용자에게는 개인정보 이전에 관한 동의 철회권을 부여합니다.)
④ 그 밖에 법률에 특별한 규정이 있는 경우

[개인정보 보유 기간 및 파기]
① 회원의 개인정보는 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기됩니다. 회원이 회원탈퇴를 하거나 개인정보 허위기재로 인해 회원 ID 삭제 처분을 받은 경우 수집된 개인정보는 완전히 삭제되며 어떠한 용도로도 이용할 수 없도록 처리됩니다.
② 단, 아래 각 항목에 해당하는 경우에는 명시한 기간 동안 보관할 수 있으며, 그 외 다른 목적으로는 사용하지 않습니다.

- 불건전한 서비스 이용으로 서비스에 물의를 일으킨 이용자의 경우 사법기관 수사의뢰를 하거나 다른 회원을 보호할 목적으로 1년간 해당 개인정보를 보관할 수 있습니다.
- 관계법령의 규정에 의하여 보관할 필요가 있는 경우 회사는 개인 정보 수집 및 이용 목적 달성 후에도 관계법령에서 정한 일정 기간동안 회원의 개인정보를 보관할 수 있습니다.

ㄱ. 계약 또는 청약철회 등에 관한 기록: 5년

ㄴ. 소비자의 불만 또는 분쟁처리에 관한 기록: 3년

ㄷ. 표시, 광고에 관한 기록: 6개월

ㄹ 웹사이트 방문기록: 3개월
③ 회사는 '개인정보 유효기간제'에 따라 1년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관하여 관리합니다.

[회원 및 법정 대리인의 권리와 그 행사방법]
① 회원 및 법정대리인은 언제든지 개인정보 보호 관련 권리(개인정보열람요구, 오류 등이 있을 경우 정정 및 삭제)를 행사할 수 있으며, 그 절차는 다음과 같습니다.

- 회원의 개인정보는 Artique App의 [마이 페이지] > [설정] > [내 계정]에서 조회가 가능합니다. 개인정보 수정이 필요할 경우, 연동 된 SNS 계정을 통해 수정 가능합니다.
- 회원의 가입해지 및 삭제를 위해서는 Artique App의 [마이 페이지] > [설정] > [내 계정] > [탈퇴하기]를 클릭하여 탈퇴가 가능합니다.
- 또는 Artique App의 [마이 페이지] > [설정] > [고객센터] > [1:1 문의]를 통해 개인정보 수정 및 회원 탈퇴를 요청하실 수 있습니다.

② 회원이 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 당해 개인정보를 이용하거나 제3자에 제공하지 않습니다. 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제 3자에게 지체 없이 통지하여 정정하도록 조치하겠습니다. 단, 다음과 같은 경우에는 예외적으로 개인정보의 열람 및 정정을 제한할 수 있습니다.

- 본인 또는 제 3 자의 생명, 신체, 재산 또는 권익을 현저하게 해할 우려가 있는 경우
- 당해 서비스 제공자의 업무에 현저한 지장을 미칠 우려가 있는 경우
- 법령에 위반하는 경우

[회원의 권리와 의무]
회원은 본인의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해주시기 바랍니다. 회원이 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 회원 자신에게 있으며 타인 정보의 도용 등 허위정보를 입력할 경우 계정의 이용이 제한될 수 있습니다.
회사가 운영하는 서비스를 이용하는 회원은 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 회원은 이메일, 아이디(ID), 비밀번호를 포함한 개인정보가 유출되지 않도록 조심하여야 하며, 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해야 합니다. 만약 이 같은 책임을 다하지 못하고 타인의 정보 및 타인의 존엄성을 훼손할 경우에는 정보통신망법 등에 의해 처벌받을 수 있습니다.

[고지의 의무]
현 「개인정보처리방침」 내용의 추가, 삭제 및 수정이 있을 시에는 개정 최소 7일 전부터 Artique App의 '공지사항'을 통해 고지하고, 개정 내용이 회원에게 불리할 경우에는 개정 30일전부터 고지할 것입니다. 변경 관련 문의는 고객센터를 통해 할 수 있습니다.

[개인정보의 안전성 확보조치]
회사는 회원의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적/물리적 보호대책을 강구하고 있습니다
① 정기적인 자체 감사 실시
개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다.
② 개인정보 취급 직원의 최소화 및 교육
개인정보를 취급하는 담당자를 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.
③ 해킹 등에 대한 대비책
회사는 이용자의 개인정보를 주기적으로 백업하고 있으며, 암호화 알고리즘에 의해 네트워크상에서 안전하게 전송됩니다. 또한, 회사는 가능한 기술적 장치를 모두 갖추려고 노력하는 등 이용자의 개인 정보를 안전하게 보관하기 위해 노력하고 있습니다.
④ 개인정보에 대한 접근 제한
개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

[개인정보 보호 담당]
회사는 회원의 개인정보보호를 가장 중요시하며, 회원의 개인정보가 훼손, 침해 또는 누설되지 않도록 최선을 다하고 있습니다. 서비스를 이용하시면서 발생하는 모든 개인정보보호 관련 민원은 고객 센터에 신고하시면 신속하게 답변해 드리도록 하겠습니다.
성명: 설원상
소속: 고객상담센터
전자우편: artique.luta@gmail.com
기타 개인정보에 관한 상담이 필요한 경우에는 정보통신부 산하 공공기관인 한국인터넷진흥원(KISA) 개인정보침해신고센터, 경찰청사이버테러대응센터, 대검찰청 사이버범죄수사단으로 문의하시기 바랍니다.
`