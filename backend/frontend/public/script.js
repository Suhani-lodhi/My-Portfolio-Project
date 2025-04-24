const text = "Suhani Lodhi";
const introText = document.getElementById("intro-text");
let index = 0;
let isDeleting = false;

function typeWriter() {
  if (!isDeleting && index < text.length) {
    introText.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100); 
  } else if (isDeleting && index > 0) {
    introText.innerHTML = text.substring(0, index - 1);
    index--;
    setTimeout(typeWriter, 100); 
  } else {
    isDeleting = !isDeleting;
    setTimeout(typeWriter, 500); 
  }
}

window.onload = typeWriter;



// Technology stack

function openModal(project) {
  event.preventDefault();
  document.getElementById('techModal').style.display = 'block';
  document.getElementById('projectName').innerText = project;
  
  let techBars = document.getElementById('techBars');
  techBars.innerHTML = '';

  let techData = {
    'Portfolio Website': [
      { tech: 'HTML', percent: 90 },
      { tech: 'CSS', percent: 85 },
      { tech: 'JavaScript', percent: 70 },
      {tech: 'MongoDB', percent:30}
    ],
    'Tokens-for-Mentoring-New-Learner': [
      { tech: 'Solidity', percent: 100},
     
    ],
    'Spotify Clone': [
      { tech: 'HTML', percent: 85 },
      { tech: 'CSS', percent: 90 },
     
    ],
    'CodSoft Internship': [
      { tech: 'HTML', percent: 90 },
      { tech: 'CSS', percent: 80 },
      { tech: 'JavaScript', percent: 75 }
    ]
  };

  let selectedTech = techData[project] || [];

  selectedTech.forEach(function(item) {
    techBars.innerHTML += `
      <p style="background-color: white ; color: black">${item.tech}</p>
      <div style="background: #ddd; border-radius: 5px; margin-bottom:10px;">
        <div style="width:${item.percent}%; background:#58A6FF ; height:20px; border-radius:5px;"></div>
      </div>
    `;
  });
}

function closeModal() {
  document.getElementById('techModal').style.display = 'none';
}
