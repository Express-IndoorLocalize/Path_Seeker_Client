export const locations = [
  { label: 'Final Year Lab', value: 'Final_Year_Lab' },
  { label: 'SE', value: 'SE' },
  { label: 'Fabric Lab', value: 'Fabric_Lab' },
  { label: 'Washroom', value: 'Washroom' },
  { label: 'Embedded Engineering Lab', value: 'Embedded_Engineering_Lab' },
  { label: 'Research Lab', value: 'Research_lab' },
  { label: 'Old Advanced Lab', value: 'Old_Advanced_Lab' },
  { label: 'RA Lab', value: 'RA_Lab' },
  { label: 'Staff Rooms', value: 'Staff_Rooms' },
  { label: 'Conference Room', value: 'Conference_Room' },
  { label: 'Lunch Room', value: 'Lunch_Room' },
  { label: 'Systems Lab', value: 'Systems_Lab' },
  { label: 'ICE Room', value: 'ICE_Room' },
  { label: 'Server Room', value: 'Server_Room' },
  { label: 'Staff Washroom', value: 'Staff_Washroom' },
  { label: 'Old Codegen Lab', value: 'Old_Codegen_Lab' },
  { label: 'Studio', value: 'Studio' },
  { label: 'Embedded Lab', value: 'Embedded_Lab' },
  { label: 'Network Lab', value: 'Network_Lab' },
  { label: 'Seminar Room', value: 'Seminar_Room' },
  { label: 'E-Wis Lab', value: 'E-Wis_Lab' },
  { label: 'Codegen Lab', value: 'Codegen_Lab' },
  { label: 'Sysco Lounge', value: 'Sysco_Lounge' },
  { label: 'Insight Hub', value: 'Insight_Hub' },
  { label: 'HPC Lab', value: 'HPC_Lab' },
  { label: 'IntelliSense Lab', value: 'IntelliSense_Lab' },
  { label: 'L1 Lab', value: 'L1_Lab' },
  { label: 'CSE Office', value: 'CSE_Office' },
  { label: 'HoD Office', value: 'HoD_Office' }
];

export const mapedLocations = {
  'A': [['Final_Year_Lab', 1], ['B', 30], ['U', 46], ['L1_Lab', 1]],
  'B': [['SE', 1], ['Fabric_Lab', 1], ['C', 74], ['A', 30]],
  'C': [['Washroom', 1], ['Embedded_Engineering_Lab', 1], ['D', 44], ['B', 74]],
  'D': [['Research_lab', 1], ['E', 80], ['C', 44]],
  'E': [['Old_Advanced_Lab', 1], ['F', 38], ['D', 80]],
  'F': [['RA_Lab', 1], ['G', 78], ['E', 38]],
  'G': [['A1', 1], ['F', 78], ['H', 44]],
  'H': [['G', 44], ['I', 78], ['W', 36]],
  'I': [['A2', 1], ['H', 78], ['J', 50]],
  'J': [['Systems_Lab', 1], ['ICE_Room', 1], ['I', 50], ['K', 28]],
  'K': [['J', 28], ['L', 36], ['Staff_Washroom', 1]],
  'L': [['K', 36], ['M', 52], ['Old_Codegen_Lab', 1]],
  'M': [['L', 52], ['N', 36], ['A3', 1], ['Seminar_Room', 1], ['E-Wis_Lab', 1]],
  'N': [['M', 36], ['O', 72], ['Codegen_Lab', 1]],
  'O': [['N', 72], ['P', 18], ['Sysco_Lounge', 1]],
  'P': [['O', 18], ['Q', 34], ['V', 42], ['Insight_Hub', 1]],
  'Q': [['P', 34], ['R', 62], ['Insight_Hub', 1]],
  'R': [['Q', 62], ['S', 36], ['A4', 1]],
  'S': [['R', 36], ['T', 36], ['HPC_Lab', 1]],
  'T': [['S', 36], ['U', 70], ['IntelliSense_Lab', 1]],
  'U': [['T', 70], ['A', 46], ['L1_Lab', 1]],
  'V': [['P', 42], ['W', 28], ['CSE_Office', 1]],
  'W': [['V', 28], ['H', 36], ['HoD_Office', 1]],
  'A1': [['G', 1], ['Staff_Rooms', 44]],
  'A2': [['I', 1], ['Staff_Rooms', 78], ['Conference_Room', 1], ['Lunch_Room', 1]],
  'A3': [['M', 1], ['Studio', 1]],
  'A4': [['R', 1], ['Embedded_Lab', 1], ['Network_Lab', 1]],
  'Final_Year_Lab': [['A', 1]],
  'SE': [['B', 1]],
  'Fabric_Lab': [['B', 1]],
  'Washroom': [['C', 1]],
  'Embedded_Engineering_Lab': [['C', 1]],
  'Research_lab': [['D', 1]],
  'Old_Advanced_Lab': [['E', 1]],
  'RA_Lab': [['F', 1]],
  'Staff_Rooms': [['A1', 44], ['A2', 78]],
  'Conference_Room': [['A2', 1]],
  'Lunch_Room': [['A2', 1]],
  'Systems_Lab': [['J', 1]],
  'ICE_Room': [['J', 1], ['Server_Room', 1]],
  'Server_Room': [['ICE_Room', 1]],
  'Staff_Washroom': [['K', 1]],
  'Old_Codegen_Lab': [['L', 1]],
  'Studio': [['A3', 1]],
  'Embedded_Lab': [['A4', 1]],
  'Network_Lab': [['A4', 1]],
  'Seminar_Room': [['M', 1]],
  'E-Wis_Lab': [['M', 1]],
  'Codegen_Lab': [['N', 1]],
  'Sysco_Lounge': [['O', 1]],
  'Insight_Hub': [['P', 1], ['Q', 1]],
  'HPC_Lab': [['S', 1]],
  'IntelliSense_Lab': [['T', 1]],
  'L1_Lab': [['A', 1], ['U', 1]],
  'CSE_Office': [['V', 1]],
  'HoD_Office': [['W', 1]],
};

export const coordinates4Sysco2Embeded = [
  {
    "x": 264.17,
    "y": 27.263
  },
  {
    "x": 262.428,
    "y": 68.55
  },
  {
    "x": 162.329,
    "y": 68.55
  },
  {
    "x": 119.827,
    "y": 68.55
  },
  {
    "x": 119.827,
    "y": 133.935
  },
  {
    "x": 119.827,
    "y": 228.413
  },
  {
    "x": 119.827,
    "y": 283.52
  },
  {
    "x": 119.827,
    "y": 332.879
  },
  {
    "x": 119.827,
    "y": 419.285
  },
  {
    "x": 119.827,
    "y": 466.727
  },
  {
    "x": 119.827,
    "y": 489.316
  },
  {
    "x": 76.861,
    "y": 518.989
  }
]