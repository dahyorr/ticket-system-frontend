export const priorityMap = (priority='') => {
    if (isNaN(priority) || priority === ''){
        switch(priority.toLowerCase()){
            case 'critical':
                return 1
            case 'high':
                return 2            
            case 'normal':
                return 3
            case 'low':
                return 4
            case 'very low':
                return 5
            default:
                return 3
        }
    }
    else{
        return priority
    }
}