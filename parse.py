import json, urllib2
from pprint import pprint
import csv

places = []
people = []
states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

# {'WA': [{"label": "Male", "count": 10} {"label": "Female", "count", 2}],  'NY': [{"label": "Male", "count": 10} {"label": "Female", "count", 2}] ...}
state_shootings = {}
state_gender = {}
state_race = {}
state_age = {}

state_gender_karen = {}
for state in states:
    state_gender_karen[state] = []
    state_gender_karen[state].append({"label": "Male", "count": 0})
    state_gender_karen[state].append({"label": "Female", "count": 0})

state_race_karen = {}
for state in states:
    state_race_karen[state] = []
    state_race_karen[state].append({"label": "Asian", "count": 0})
    state_race_karen[state].append({"label": "Black", "count": 0})
    state_race_karen[state].append({"label": "Hispanic", "count": 0})
    state_race_karen[state].append({"label": "White", "count": 0})

state_age_karen = {}
for state in states:
    state_age_karen[state] = []
    state_age_karen[state].append({"label": "0-20", "count": 0})
    state_age_karen[state].append({"label": "21-30", "count": 0})
    state_age_karen[state].append({"label": "31-40", "count": 0})
    state_age_karen[state].append({"label": "41-50", "count": 0})
    state_age_karen[state].append({"label": "51+", "count": 0})

for state in states:
    state_shootings[state] = 0

for state in states:
    state_gender[state] = {}
    state_gender[state]['female'] = 0
    state_gender[state]['male'] = 0

for state in states:
    state_race[state] = {}
    state_race[state]['white'] = 0
    state_race[state]['black'] = 0
    state_race[state]['asian'] = 0
    state_race[state]['hispanic'] = 0 # Hispanic
    # state_race[state]['Latino'] = 0
    # state_race[state]['African American'] = 0
    # state_race[state]['Caucasion'] = 0
    # state_race[state]['Alaska Native'] = 0

for state in states:
    state_age[state] = {}
    state_age[state]['0-20'] = 0
    state_age[state]['21-30'] = 0
    state_age[state]['31-40'] = 0
    state_age[state]['41-50'] = 0
    state_age[state]['51+'] = 0

counting =0

# 2000 - 2017
date_victims = {}
for year in range(2000, 2018):
    date_victims[year] = {}
    for month in range(0, 13):
        date_victims[year][month] = 0
print date_victims

date_shootings = {}
for year in range(2000, 2018):
    date_shootings[year] = {}
    for month in range(0, 13):
        date_shootings[year][month] = 0
print date_shootings

with open('with_dates.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        # date stuff
        full_date = row['Date']
        year = int(full_date[:4])
        month = int(full_date[5:7])

        layers = row['Address'].split(", ")
        try:
            if layers[2] == 'USA':
                state_shootings[layers[1][:2]]+=1
                counting += 1
        except:
            print 'except message; ignore'
        places.append(row['Address'])
        people.append(row['Info about participants'])
        listy = row['Info about participants']
        new_list = listy.replace("u'", "'")
        new_list = new_list.replace("'", '"')
        new_list = new_list.replace("True", 'true')
        new_list = new_list.replace("False", 'false')

        try:
            new_list = json.loads(new_list)
            try:
                date_shootings[year][month] += 1
                date_victims[year][month] += len(new_list)
            except:
                print "don't have " + str(year)
            for person in new_list:
                if person['is_victim'] == True and layers[2] == 'USA':
                    #gender
                    if person['gender'] == 'Male':
                        state_gender[layers[1][:2]]['male'] +=1
                        state_gender_karen[layers[1][:2]][0]['count'] += 1
                    else:
                        state_gender[layers[1][:2]]['female'] +=1
                        state_gender_karen[layers[1][:2]][1]['count'] += 1
                    #race
                    if person['race'] == 'white' or person['race'] == 'Caucasian':
                        state_race[layers[1][:2]]['white'] +=1
                        state_race_karen[layers[1][:2]][3]['count'] +=1
                    elif person['race'] == 'black' or person['race'] == 'African American':
                        state_race[layers[1][:2]]['black'] +=1
                        state_race_karen[layers[1][:2]][1]['count'] +=1
                    elif person['race'] == 'Latino' or person['race'] == 'Hispanic':
                        state_race[layers[1][:2]]['hispanic'] +=1
                        state_race_karen[layers[1][:2]][2]['count'] +=1
                    else:
                        state_race[layers[1][:2]]['asian'] +=1
                        state_race_karen[layers[1][:2]][0]['count'] +=1
                    #age
                    if int(person['age']) < 21:
                        state_age[layers[1][:2]]['0-20'] += 1
                        state_age_karen[layers[1][:2]][0]['count'] +=1
                    elif int(person['age']) < 31:
                        state_age[layers[1][:2]]['21-30'] += 1
                        state_race_karen[layers[1][:2]][1]['count'] +=1
                    elif int(person['age']) < 41:
                        state_age[layers[1][:2]]['31-40'] += 1
                        state_race_karen[layers[1][:2]][2]['count'] +=1
                    elif int(person['age']) < 51:
                        state_age[layers[1][:2]]['41-50'] += 1
                        state_race_karen[layers[1][:2]][3]['count'] +=1
                    else:
                        state_age[layers[1][:2]]['51+'] += 1
                        state_race_karen[layers[1][:2]][4]['count'] +=1
                        
        except:
            # print "couldn't parse it....?"
            print ""
        # print new_list

f = open("parsed.txt", "w")

print '\n\nstate numbers'
f.write('state numbers\n')
print state_shootings
f.write(json.dumps(state_shootings))

print '\n\nby gender:'
f.write('\n\nstate gender\n')
# print state_gender_karen
# f.write(json.dumps(state_gender_karen))
print state_gender
f.write(json.dumps(state_gender))

print '\n\nby race:'
f.write('\n\nstate race\n')
# print state_race_karen
# f.write(json.dumps(state_race_karen))
print state_race
f.write(json.dumps(state_race))

print '\n\nby age:'
f.write('\n\nstate age\n')
# print state_age_karen
# f.write(json.dumps(state_age_karen))
print state_age
f.write(json.dumps(state_age))

male_shootings = 0
for state in state_gender:
    male_shootings += state_gender[state]['male']

female_shootings = 0
for state in state_gender:
    female_shootings += state_gender[state]['female']

black_shootings = 0
for state in state_gender:
    black_shootings += state_race[state]['black']

white_shootings = 0
for state in state_gender:
    white_shootings += state_race[state]['white']

asian_shootings = 0
for state in state_gender:
    asian_shootings += state_race[state]['asian']

hispanic_shootings = 0
for state in state_gender:
    hispanic_shootings += state_race[state]['hispanic']

teens = 0
for state in state_age:
    teens += state_age[state]['0-20']

twenties = 0
for state in state_age:
    twenties += state_age[state]['21-30']

thirties = 0
for state in state_age:
    thirties += state_age[state]['31-40']

forties = 0
for state in state_age:
    forties += state_age[state]['41-50']

fifties = 0
for state in state_age:
    fifties += state_age[state]['51+']

print '\n\ngender'

print "male shooters:"
f.write('\n\nnationals:\nmale shooters:\n')
print male_shootings
f.write(str(male_shootings))
print "female shooters:"
f.write('\nfemale shooters:\n')
print female_shootings
f.write(str(female_shootings))

print '\n\nrace'
print "black shooters:"
f.write('\nblack shooters:\n')
print black_shootings
f.write(str(black_shootings))

print "white shooters:"
f.write('\nwhite shooters:\n')
print white_shootings
f.write(str(white_shootings))
print "asian shooters:\n"
f.write('\nasian shooters:\n')
print asian_shootings
f.write(str(asian_shootings))
print "hispanic shooters:"
f.write('\nhispanic shooters:\n')
print hispanic_shootings
f.write(str(hispanic_shootings))

print '\n\nage:'
print "0-20"
print teens
print "21-30"
print twenties
print "31-40"
print thirties
print "41-50"
print forties
print "51+"
print fifties

f.write("\n\n0-20\n")
f.write(str(teens))
f.write("\n\n21-30\n")
f.write(str(twenties))
f.write("\n\n31-40\n")
f.write(str(thirties))
f.write("\n\n41-50\n")
f.write(str(forties))
f.write("\n\n51+\n")
f.write(str(fifties))

print "\nnumber of victims by date"
f.write("\n\nnumber of victims by date\n")
print date_victims
f.write(json.dumps(date_victims))

print "\nnumber of shootings by date"
f.write("\n\nnumber of shootings by date\n")
print date_shootings
f.write(json.dumps(date_shootings))