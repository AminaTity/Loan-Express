from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta
from django.utils import timezone

# Create your models here.

class Invest(models.Model):
    INVEST_STATUS = (
        ('pending', 'En attente'),
        ('approved', 'Approuvé'),
        ('rejected', 'Refusé'),
    )

    INVEST_CATEGORY = (
        ('short_term', 'Prêt à Court terme'),
        ('long_term', 'Prêt à Long terme'),
    )

    # Catégories spécifiques
    SHORT_TERM_DURATION = 3  # Mois
    LONG_TERM_DURATION = 12  # Mois

    SHORT_TERM_RATE = 4.0  # Taux d'intérêt court terme (%)
    LONG_TERM_RATE = 2.0   # Taux d'intérêt long terme (%)


    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='invests')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField()  # Durée en mois, automatiquement définie
    status = models.CharField(max_length=10, choices=INVEST_STATUS, default='pending') # Le statut du prêt qui peut être mise à jour par l'administrat
    category = models.CharField(max_length=10, choices=INVEST_CATEGORY)  # Court terme ou long terme
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    repayment_deadline = models.DateField()  # Date de remboursement
    is_approved = models.BooleanField(default=False)  # Champ pour l'approbation
    
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.category == 'short_term':
            self.duration = self.SHORT_TERM_DURATION
            self.interest_rate = self.SHORT_TERM_RATE
        elif self.category == 'long_term':
            self.duration = self.LONG_TERM_DURATION
            self.interest_rate = self.LONG_TERM_RATE
        
        if not self.repayment_deadline:
            self.repayment_deadline = (timezone.now() + timedelta(days=self.duration * 30)).date()
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Prêt de {self.amount} EUR pour {self.student} ({self.get_category_display()})"




