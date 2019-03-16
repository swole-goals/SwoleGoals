from selenium import webdriver

baseUrl = "https://strengthlevel.com"
driver = webdriver.Firefox(executable_path="/usr/bin/geckodriver/geckodriver")
driver.set_page_load_timeout(10)
try:
    driver.get(baseUrl)
except:
    pass
try:
    genderSelection = driver.find_element_by_css_selector("#gender")
    genderOptions = [x for x in genderSelection.find_elements_by_tag_name("option")]
    ageSelection = driver.find_element_by_css_selector("#formCalc").find_elements_by_xpath("//div[@class='pure-control-group']")[0].find_element_by_css_selector(".form__input--small")
    ageOptions = [x for x in ageSelection.find_elements_by_tag_name("option")]
    exerciseTypeSelection = driver.find_element_by_css_selector("#exerciseType")
    exerciseTypeOptions = [x for x in exerciseTypeSelection.find_elements_by_tag_name("option")]
    exercisesSelection = driver.find_element_by_css_selector("#exercise")
    exercisesOptions = [x for x in exercisesSelection.find_elements_by_tag_name("option")]
    submit = driver.find_element_by_css_selector(".pure-button.pure-button-primary.calculator__primaryaction")
    for genderOption in genderOptions:
        genderOption.click()
        for ageOption in ageOptions:
            ageOption.click()
            for exerciseTypeOption in exerciseTypeOptions:
                exerciseTypeOption.click()
                for exercisesOption in exercisesOptions:
                    exercisesOption.click()
                    driver.execute_script("document.getElementById('bodymass').setAttribute('value', '100')")
                    driver.execute_script("document.getElementById('liftmass').setAttribute('value', '100')")
                    try:
                        submit.click();
                    except:
                        pass
                    results = driver.find_element_by_css_selector(".pure-table.pure-table-striped.standards__table").find_element_by_css_selector("tbody").find_element_by_css_selector("tr").find_elements_by_css_selector("td")
                    for result in results:
                        print(result.get_attribute("innerHTML").split()[0])

                    break
                break
            break
        break
finally:
    driver.quit()
