export const employerJobPostController = async (req, res) => {  
    try {
       
        console.log(req.body);
        console.log(req.userID);
        

        // Validate the input data
        if (!jobTitle || !jobDescription || !companyName || !location || !salary) {
        return res.status(400).json({ message: 'All fields are required' });
        }
        return res.status(201).json({ message: 'Job post created successfully', jobPost: newJobPost });
    } catch (error) {
        console.error('Error creating job post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    }