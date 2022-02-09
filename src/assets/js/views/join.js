import { eventTrigger, nodeListEventTrigger } from "../events/event";
import { HTTP_METHOD, request, requestWithoutJson } from "../utils/fetch";
import { $, $All, getFormData, redirectItemDetail } from "../utils/utils";
import {
  paintErrorMessage,
  paintSuccessMessage,
} from "../../components/paintMessage";

export class Join {
  constructor() {
    this.form = $(".join-form-container form");
    this.inputs = $All(".join-form-container form input");
    this.VERIFING_ERROR_MESSAGE = {
      email: "이메일을 입력하세요.",
      userName: "사용자 이름은 영문과 숫자 조합으로만 작성할 수 있습니다.",
      name: "이름은 한글로만 작성할 수 있으며 2-6 글자만 입력할 수 있습니다.",
      password:
        "비밀번호는 특수문자, 영문, 숫자, 8글자 이상으로 작성되어야합니다.",
      password2: "비밀번호가 앞에 입력한 비밀번호와 다릅니다.",
      exist: "이미 다른 사람이 사용하는 중이에요!",
    };
    this.VERIFING_SUCCESS_MESSAGE = {
      email: "좋은 이메일이네요.",
      userName: "좋은 닉네임이네요.",
      name: "이름이 이뻐요.",
      password: "비밀번호로 사용하기 좋아요!",
      password2: "앞의 비밀번호와 똑같습니다.",
    };
    this.REGULAR_EXPRESSION_OBJECT = {
      email:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      name: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/,
      userName: /^[a-zA-Z0-9]{5,10}$/,
      password:
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
    };
    this.init();
  }

  init() {
    nodeListEventTrigger(
      ".join-form-container form input",
      (event) => {
        this.verifyInputValue(event.currentTarget);
      },
      "focusout",
    );
    eventTrigger(
      ".join-form-container form button",
      this.joinDataSubmintToDB,
      "click",
    );
  }

  async checkedDataBase(node) {
    if (node.name !== "email" && node.name !== "userName") {
      return true;
    }

    const { exist } = await request(
      `/api/checked-db/${node.name}=${node.value}`,
      HTTP_METHOD.GET(),
    );

    if (exist) {
      paintErrorMessage(node, this.VERIFING_ERROR_MESSAGE["exist"]);
      return;
    }

    return !exist;
  }

  isTrue = (node) => {
    if (!node.value) {
      return false;
    }

    if (node.name === "password2") {
      const password = $("input[name='password']");
      return password.value === node.value;
    }

    const checkedString = this.REGULAR_EXPRESSION_OBJECT[node.name].exec(
      node.value,
    );

    if (checkedString !== null && checkedString.length !== 0) {
      return this.checkedDataBase(node);
    }

    return false;
  };

  verifyInputValue(node) {
    if (this.isTrue(node)) {
      paintSuccessMessage(node, this.VERIFING_SUCCESS_MESSAGE[node.name]);
      return;
    }

    paintErrorMessage(node, this.VERIFING_ERROR_MESSAGE[node.name]);
    return;
  }

  joinDataSubmintToDB = async (e) => {
    e.preventDefault();
    if (
      Array.from(this.inputs).filter(
        (input) => input.dataset.isError === "true" || input.value === "",
      ).length !== 0
    ) {
      // modal
      console.log("hi");
      return;
    }

    const data = getFormData(this.form);
    await requestWithoutJson("/join", HTTP_METHOD.POST(data));
    redirectItemDetail("/");
  };
}
