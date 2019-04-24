from selenium import webdriver
import re
import unittest


baseUrl = "http://swolegoals.s3-website.us-east-2.amazonaws.com/app-splash"
driver = webdriver.Chrome(executable_path="/Users/Nickp/Desktop/chromedriver.exe")
driver.set_page_load_timeout(20)

def vivian_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[1]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def kaibo_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[2]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def nicole_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[3]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def michael_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[4]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def nick_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[5]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def rohan_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/div[1]/div[6]/div/div/p[2]").get_attribute("innerHTML")
    return commit_parser(commits)

def total_commits():
    commits = driver.find_element_by_xpath(
        "/html/body/app-root/body/app-github-stats/body/div/h5[1]").get_attribute("innerHTML")
    return commit_parser(commits)

def commit_parser(commit_string):
    return int(re.findall('\d+', commit_string)[0])


try:
    driver.get(baseUrl)
    aboutLink = driver.find_element_by_xpath("//*[@id='navbarNav']/ul/li[2]/a").click()
    totalCommits = total_commits()
    vivianCommits = vivian_commits()
    kaiboCommits = kaibo_commits()
    nicoleCommits = nick_commits()
    michaelCommits = michael_commits()
    nickCommits = nick_commits()
    rohanCommits = rohan_commits()
    addedCommits = vivianCommits + kaiboCommits + nicoleCommits + michaelCommits + nickCommits + rohanCommits
except:
    pass

finally:
    driver.quit()


class TestCommits(unittest.TestCase):
    def test_vivian_commits(self):
        self.assertGreater(vivianCommits, 0, "vivian should be > 0")

    def test_kaibo_commits(self):
        self.assertGreater(kaiboCommits, 0, "kaibo should be > 0")

    def test_nicole_commits(self):
        self.assertGreater(nicoleCommits, 0, "nicole should be > 0")

    def test_michael_commits(self):
        self.assertGreater(michaelCommits, 0, "michael should be > 0")

    def test_nick_commits(self):
        self.assertGreater(nickCommits, 0, "nick should be > 0")

    def test_rohan_commits(self):
        self.assertGreater(rohanCommits, 0, "rohan should be > 0")

    def test_total_commits(self):
        self.assertGreater(totalCommits, 0, "total should be > 0")

    def test_added_commits(self):
        self.assertEqual(totalCommits, addedCommits, "cumulative should equal total")


if __name__ == '__main__':
    unittest.main()




