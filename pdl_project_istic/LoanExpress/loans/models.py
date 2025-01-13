from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta
from django.forms import ValidationError
from django.utils import timezone

class Loan(models.Model):

    LOAN_STATUS = (
        ('pending', 'En attente'),
        ('approved', 'Approuvé'),
        ('rejected', 'Refusé'),
    )

    LOAN_CATEGORY = (
        ('short_term', 'Prêt à Court terme'),
        ('long_term', 'Prêt à Long terme'),
    )

    # Catégories spécifiques
    SHORT_TERM_DURATION = 4  # Mois
    LONG_TERM_DURATION = 9  # Mois

    SHORT_TERM_RATE = 5.0  # Taux d'intérêt court terme (%)
    LONG_TERM_RATE = 3.0   # Taux d'intérêt long terme (%)

    SHORT_TERM_MAX_AMOUNT = 600.0 
    LONG_TERM_MAX_AMOUNT = 1000.0

    student = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='loans')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.IntegerField()  # Durée en mois, automatiquement définie
    purpose = models.TextField()  # Description de l'objectif du prêt
    status = models.CharField(max_length=10, choices=LOAN_STATUS, default='pending') # Le statut du prêt qui peut être mise à jour par l'administrat
    category = models.CharField(max_length=10, choices=LOAN_CATEGORY)  # Court terme ou long terme
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    repayment_deadline = models.DateField()  # Date de remboursement
    is_approved = models.BooleanField(default=False)  # Champ pour l'approbation
    
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.category == 'short_term':
            self.duration = self.SHORT_TERM_DURATION
            self.interest_rate = self.SHORT_TERM_RATE
            max_amount = self.SHORT_TERM_MAX_AMOUNT
        elif self.category == 'long_term':
            self.duration = self.LONG_TERM_DURATION
            self.interest_rate = self.LONG_TERM_RATE
            max_amount = self.LONG_TERM_MAX_AMOUNT
        
        if not self.repayment_deadline:
            self.repayment_deadline = (timezone.now() + timedelta(days=self.duration * 30)).date()


        if self.amount > max_amount:
            raise ValidationError(f"Le montant du prêt ne peut pas dépasser {max_amount} EUR pour un prêt de type {self.get_category_display()}.")
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"Prêt de {self.amount} EUR pour {self.student} ({self.get_category_display()})"
