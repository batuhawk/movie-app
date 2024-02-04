import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState();

  const languageUpdate = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      className="movie-language"
      onChange={(event) => languageUpdate(event)}
    >
      <option value={language} selected>
        {t("English")}
      </option>
      <option value="tr">{t("Turkish")}</option>
    </select>
  );
};

export default LanguageSelect;
