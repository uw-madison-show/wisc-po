// JSHint options:
/* exported dataCountry, regionDictionary */

var regionDictionary = {
  'Adams': 2,
  'Ashland': 4,
  'Barron': 3,
  'Bayfield': 4,
  'Brown': 5,
  'Buffalo': 3,
  'Burnett': 3,
  'Calumet': 5,
  'Chippewa': 3,
  'Clark': 3,
  'Columbia': 2,
  'Crawford': 2,
  'Dane': 2,
  'Dodge': 2,
  'Door': 5,
  'Douglas': 3,
  'Dunn': 3,
  'Eau Claire': 3,
  'Florence': 4,
  'Fond du Lac': 5,
  'Forest': 4,
  'Grant': 2,
  'Green': 2,
  'Green Lake': 5,
  'Iowa': 2,
  'Iron': 4,
  'Jackson': 3,
  'Jefferson': 1,
  'Juneau': 2,
  'Kenosha': 1,
  'Kewaunee': 5,
  'La Crosse': 3,
  'Lafayette': 2,
  'Langlade': 4,
  'Lincoln': 4,
  'Manitowoc': 5,
  'Marathon': 4,
  'Marinette': 5,
  'Marquette': 5,
  'Menominee': 5,
  'Milwaukee': 1,
  'Monroe': 3,
  'Oconto': 5,
  'Oneida': 4,
  'Outagamie': 5,
  'Ozaukee': 1,
  'Pepin': 3,
  'Pierce': 3,
  'Polk': 3,
  'Portage': 4,
  'Price': 4,
  'Racine': 1,
  'Richland': 2,
  'Rock': 2,
  'Rusk': 3,
  'Sauk': 2,
  'Sawyer': 4,
  'Shawano': 5,
  'Sheboygan': 5,
  'St. Croix': 3,
  'Taylor': 4,
  'Trempealeau': 3,
  'Vernon': 2,
  'Vilas': 4,
  'Walworth': 1,
  'Washburn': 3,
  'Washington': 1,
  'Waukesha': 1,
  'Waupaca': 5,
  'Waushara': 5,
  'Winnebago': 5,
  'Wood': 4
};

// Prepare demo data
var dataCountry = [
  {
    'hc-key': 'us-ma',
    'name': 'Massachusetts',
    'value': 0
  },
  {
    'hc-key': 'us-wa',
    'name': 'Washington',
    'value': 1
  },
  {
    'hc-key': 'us-ca',
    'name': 'California',
    'value': 2
  },
  {
    'hc-key': 'us-or',
    'name': 'Oregon',
    'value': 3
  },
  {
    'hc-key': 'us-wi',
    'name': 'Wisconsin',
    'value': 4
  },
  {
    'hc-key': 'us-me',
    'name': 'Maine',
    'value': 5
  },
  {
    'hc-key': 'us-mi',
    'name': 'Michigan',
    'value': 6
  },
  {
    'hc-key': 'us-nv',
    'name': 'Nevada',
    'value': 7
  },
  {
    'hc-key': 'us-nm',
    'name': 'New Mexico',
    'value': 8
  },
  {
    'hc-key': 'us-co',
    'name': 'Colorado',
    'value': 9
  },
  {
    'hc-key': 'us-wy',
    'name': 'Wyoming',
    'value': 10
  },
  {
    'hc-key': 'us-ks',
    'name': 'Kansas',
    'value': 11
  },
  {
    'hc-key': 'us-ne',
    'name': 'Nebraska',
    'value': 12
  },
  {
    'hc-key': 'us-ok',
    'name': 'Oklahoma',
    'value': 13
  },
  {
    'hc-key': 'us-mo',
    'name': 'Missouri',
    'value': 14
  },
  {
    'hc-key': 'us-il',
    'name': 'Illinois',
    'value': 15
  },
  {
    'hc-key': 'us-in',
    'name': 'Indiana',
    'value': 16
  },
  {
    'hc-key': 'us-vt',
    'name': 'Vermont',
    'value': 17
  },
  {
    'hc-key': 'us-az',
    'name': 'Arizona',
    'value': 18
  },
  {
    'hc-key': 'us-ar',
    'name': 'Arkansas',
    'value': 19
  },
  {
    'hc-key': 'us-tx',
    'name': 'Texas',
    'value': 20
  },
  {
    'hc-key': 'us-ri',
    'name': 'Rhode Island',
    'value': 21
  },
  {
    'hc-key': 'us-al',
    'name': 'Alabama',
    'value': 22
  },
  {
    'hc-key': 'us-ga',
    'name': 'Georgia',
    'value': 23
  },
  {
    'hc-key': 'us-ms',
    'name': 'Mississippi',
    'value': 24
  },
  {
    'hc-key': 'us-sc',
    'name': 'South Carolina',
    'value': 25
  },
  {
    'hc-key': 'us-nc',
    'name': 'North Carolina',
    'value': 26
  },
  {
    'hc-key': 'us-va',
    'name': 'Virginia',
    'value': 27
  },
  {
    'hc-key': 'us-ia',
    'name': 'Iowa',
    'value': 28
  },
  {
    'hc-key': 'us-md',
    'name': 'Maryland',
    'value': 29
  },
  {
    'hc-key': 'us-de',
    'name': 'Delaware',
    'value': 30
  },
  {
    'hc-key': 'us-nj',
    'name': 'New Jersey',
    'value': 31
  },
  {
    'hc-key': 'us-pa',
    'name': 'Pennsylvania',
    'value': 32
  },
  {
    'hc-key': 'us-ny',
    'name': 'New York',
    'value': 33
  },
  {
    'hc-key': 'us-id',
    'name': 'Idaho',
    'value': 34
  },
  {
    'hc-key': 'us-sd',
    'name': 'South Dakota',
    'value': 35
  },
  {
    'hc-key': 'us-ct',
    'name': 'Connecticut',
    'value': 36
  },
  {
    'hc-key': 'us-nh',
    'name': 'New Hampshire',
    'value': 37
  },
  {
    'hc-key': 'us-ky',
    'name': 'Kentucky',
    'value': 38
  },
  {
    'hc-key': 'us-oh',
    'name': 'Ohio',
    'value': 39
  },
  {
    'hc-key': 'us-tn',
    'name': 'Tennessee',
    'value': 40
  },
  {
    'hc-key': 'us-wv',
    'name': 'West Virginia',
    'value': 41
  },
  {
    'hc-key': 'us-dc',
    'name': 'District of Columbia',
    'value': 42
  },
  {
    'hc-key': 'us-la',
    'name': 'Louisiana',
    'value': 43
  },
  {
    'hc-key': 'us-fl',
    'name': 'Florida',
    'value': 44
  },
  {
    'hc-key': 'us-mn',
    'name': 'Minnesota',
    'value': 45
  },
  {
    'hc-key': 'us-mt',
    'name': 'Montana',
    'value': 46
  },
  {
    'hc-key': 'us-nd',
    'name': 'North Dakota',
    'value': 47
  },
  {
    'hc-key': 'us-ut',
    'name': 'Utah',
    'value': 48
  },
  {
    'hc-key': 'us-hi',
    'name': 'Hawaii',
    'value': 49
  },
  {
    'hc-key': 'us-ak',
    'name': 'Alaska',
    'value': 50
  }
];
